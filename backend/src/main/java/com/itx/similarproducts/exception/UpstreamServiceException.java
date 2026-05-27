package com.itx.similarproducts.exception;

/**
 * Fallo del API externo
 */
public class UpstreamServiceException extends RuntimeException {

    public UpstreamServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
