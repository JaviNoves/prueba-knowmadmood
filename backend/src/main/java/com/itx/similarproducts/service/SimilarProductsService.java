package com.itx.similarproducts.service;

import com.itx.similarproducts.model.ProductDetail;
import reactor.core.publisher.Flux;

public interface SimilarProductsService {
    /**
     * Obtiene los productos similares a un producto dado.
     */
    Flux<ProductDetail> getSimilarProducts(String productId);
}
