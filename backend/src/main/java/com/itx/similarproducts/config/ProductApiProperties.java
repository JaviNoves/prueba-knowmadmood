package com.itx.similarproducts.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

/**
 * Configuración para la conexion con la API.
 */
@ConfigurationProperties(prefix = "product-api")
public class ProductApiProperties {

    private final String baseUrl;
    private final Duration responseTimeout;
    private final Duration connectTimeout;
    private final int maxConnections;
    private final int detailConcurrency;
    private final Retry retry;
    private final Cache cache;

    public ProductApiProperties(String baseUrl, Duration responseTimeout, Duration connectTimeout,
                                int maxConnections, int detailConcurrency, Retry retry, Cache cache) {
        this.baseUrl = baseUrl;
        this.responseTimeout = responseTimeout;
        this.connectTimeout = connectTimeout;
        this.maxConnections = maxConnections;
        this.detailConcurrency = detailConcurrency;
        this.retry = retry;
        this.cache = cache;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public Duration getResponseTimeout() {
        return responseTimeout;
    }

    public Duration getConnectTimeout() {
        return connectTimeout;
    }

    public int getMaxConnections() {
        return maxConnections;
    }

    public int getDetailConcurrency() {
        return detailConcurrency;
    }

    public Retry getRetry() {
        return retry;
    }

    public Cache getCache() {
        return cache;
    }

    // Reintentos al llamar a la API
    public static class Retry {

        private final int maxAttempts;
        private final Duration backoff;

        public Retry(int maxAttempts, Duration backoff) {
            this.maxAttempts = maxAttempts;
            this.backoff = backoff;
        }

        public int getMaxAttempts() {
            return maxAttempts;
        }

        public Duration getBackoff() {
            return backoff;
        }
    }

    public static class Cache {

        private final long maximumSize;
        private final Duration ttl;

        public Cache(long maximumSize, Duration ttl) {
            this.maximumSize = maximumSize;
            this.ttl = ttl;
        }

        public long getMaximumSize() {
            return maximumSize;
        }

        public Duration getTtl() {
            return ttl;
        }
    }
}
