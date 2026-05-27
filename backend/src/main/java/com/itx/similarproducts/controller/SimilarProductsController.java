package com.itx.similarproducts.controller;

import com.itx.similarproducts.model.ProductDetail;
import com.itx.similarproducts.service.SimilarProductsService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
public class SimilarProductsController {

    private final SimilarProductsService service;

    public SimilarProductsController(SimilarProductsService service) {
        this.service = service;
    }

    @GetMapping(value = "/product/{productId}/similar", produces = MediaType.APPLICATION_JSON_VALUE)
    public Flux<ProductDetail> getSimilarProducts(@PathVariable String productId) {
        return service.getSimilarProducts(productId);
    }
}
