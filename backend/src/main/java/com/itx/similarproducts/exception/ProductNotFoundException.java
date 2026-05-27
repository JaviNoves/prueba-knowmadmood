package com.itx.similarproducts.exception;

/**
 * 404 de un producto.
 */
public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(String productId) {
        super("Product not found: " + productId);
    }
}
