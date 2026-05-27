package com.itx.similarproducts.service;

import com.itx.similarproducts.client.ProductClient;
import com.itx.similarproducts.config.ProductApiProperties;
import com.itx.similarproducts.model.ProductDetail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Servicio de negocio encargado de obtener los productos similares a un producto dado.
 *
 * <p>Primero se obtiene la lista ordenada de ids similares y después se resuelve el
 * detalle de cada producto en paralelo, manteniendo el orden de similitud.
 *
 * <p>Se ha optado por una respuesta parcial para mejorar la resiliencia donde
 * si un producto similar no existe, falla o tarda más del timeout configurado, se omite
 * y se devuelven igualmente el resto de productos disponibles.
 * Los timeouts y reintentos se gestionan en ProductClient.
 */
@Service
public class SimilarProductsServiceImpl implements SimilarProductsService {

    private static final Logger log = LoggerFactory.getLogger(SimilarProductsServiceImpl.class);

    private final ProductClient productClient;
    private final int detailConcurrency;

    public SimilarProductsServiceImpl(ProductClient productClient, ProductApiProperties properties) {
        this.productClient = productClient;
        this.detailConcurrency = properties.getDetailConcurrency();
    }

    @Override
    public Flux<ProductDetail> getSimilarProducts(String productId) {
        return productClient.getSimilarIds(productId)
                .flatMapMany(ids -> Flux.fromIterable(ids)
                        .flatMapSequential(this::resolveDetail, detailConcurrency));
    }

    private Mono<ProductDetail> resolveDetail(String productId) {
        return productClient.getProduct(productId)
                .onErrorResume(error -> {
                    log.warn("Skipping similar product {}: {}", productId, error.toString());
                    return Mono.empty();
                });
    }
}
