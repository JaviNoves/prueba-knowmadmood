package com.itx.similarproducts.model;

import java.util.Objects;

/**
 * Detalle de producto devuelto por la API.
 */
public class ProductDetail {

    private final String id;
    private final String name;
    private final Double price;
    private final Boolean availability;

    public ProductDetail(String id, String name, Double price, Boolean availability) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.availability = availability;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Double getPrice() {
        return price;
    }

    public Boolean getAvailability() {
        return availability;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductDetail other)) {
            return false;
        }
        return Objects.equals(id, other.id)
                && Objects.equals(name, other.name)
                && Objects.equals(price, other.price)
                && Objects.equals(availability, other.availability);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, price, availability);
    }

    @Override
    public String toString() {
        return "ProductDetail{id='" + id + "', name='" + name + "', price=" + price
                + ", availability=" + availability + '}';
    }
}
