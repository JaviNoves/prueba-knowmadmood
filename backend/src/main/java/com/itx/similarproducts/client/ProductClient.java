package com.itx.similarproducts.client;

import com.github.benmanes.caffeine.cache.AsyncCache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.itx.similarproducts.config.ProductApiProperties;
import com.itx.similarproducts.exception.ProductNotFoundException;
import com.itx.similarproducts.exception.UpstreamServiceException;
import com.itx.similarproducts.model.ProductDetail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

import java.util.List;

/**
 * Cliente encargado de consumir el API externo de productos.
 *
 * <p>Las respuestas correctas se cachean con Caffeine para evitar llamadas repetidas
 * al servicio externo y mejorar el rendimiento.
 *
 * <p>Los errores temporales se reintentan de forma controlada. Los 404 se transforman
 * en ProductNotFoundException y no se reintentan. Las respuestas fallidas no se cachean.
 *
 * <p>Aunque esperar más tiempo podría permitir cachear respuestas lentas, se ha priorizado
 * no bloquear la API durante demasiado tiempo ante productos lentos o no disponibles.
 * Los timeouts, reintentos y TTL de caché son configurables para poder ajustarlos según
 * requisitos de negocio y/o métricas reales.
 */
@Component
public class ProductClient {

    private static final Logger log = LoggerFactory.getLogger(ProductClient.class);
    private static final ParameterizedTypeReference<List<String>> ID_LIST =
            new ParameterizedTypeReference<>() {
            };

    private final WebClient webClient;
    private final ProductApiProperties properties;
    private final AsyncCache<String, ProductDetail> productCache;
    private final AsyncCache<String, List<String>> similarIdsCache;

    public ProductClient(WebClient productApiWebClient, ProductApiProperties properties) {
        this.webClient = productApiWebClient;
        this.properties = properties;
        this.productCache = buildCache(properties);
        this.similarIdsCache = buildCache(properties);
    }

    private static <V> AsyncCache<String, V> buildCache(ProductApiProperties properties) {
        return Caffeine.newBuilder()
                .maximumSize(properties.getCache().getMaximumSize())
                .expireAfterWrite(properties.getCache().getTtl())
                .buildAsync();
    }

    public Mono<List<String>> getSimilarIds(String productId) {
        return Mono.fromFuture(similarIdsCache.get(productId, (id, executor) ->
                webClient.get()
                        .uri("/product/{id}/similarids", id)
                        .retrieve()
                        .onStatus(HttpStatus.NOT_FOUND::equals,
                                response -> Mono.error(new ProductNotFoundException(id)))
                        .bodyToMono(ID_LIST)
                        .transform(this::withRetry)
                        .toFuture()));
    }

    public Mono<ProductDetail> getProduct(String productId) {
        return Mono.fromFuture(productCache.get(productId, (id, executor) ->
                webClient.get()
                        .uri("/product/{id}", id)
                        .retrieve()
                        .onStatus(HttpStatus.NOT_FOUND::equals,
                                response -> Mono.error(new ProductNotFoundException(id)))
                        .bodyToMono(ProductDetail.class)
                        .transform(this::withRetry)
                        .toFuture()));
    }

    private <T> Mono<T> withRetry(Mono<T> source) {
        return source
                .retryWhen(Retry.backoff(properties.getRetry().getMaxAttempts(), properties.getRetry().getBackoff())
                        .filter(this::isRetryable)
                        .doBeforeRetry(signal -> log.debug("Reintento llamada, intento {}",
                                signal.totalRetries() + 1))
                        .onRetryExhaustedThrow((spec, signal) -> signal.failure()))
                .onErrorMap(this::isRetryable,
                        error -> new UpstreamServiceException("Llamada a la API fallida", error));
    }

    private boolean isRetryable(Throwable throwable) {
        return !(throwable instanceof ProductNotFoundException);
    }
}
