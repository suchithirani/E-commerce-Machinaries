package com.machine.backend.Dto;

import java.math.BigDecimal;

public class ProductDto {
    private String name;
    private String description;
    private BigDecimal price;
    private Long categoryId;
    private Integer stock;
    private String imageUrl;
    private String brand;
    private BigDecimal weight;
    private String warranty;
    public String getName() {
      return name; 
    }
    public void setName(String name) {
      this.name = name;
    }
    public String getDescription() {
      return description;
    }
    public void setDescription(String description) {
      this.description = description;
    }
    public BigDecimal getPrice() {
      return price;
    }
    public void setPrice(BigDecimal price) {
      this.price = price;
    }
    public Long getCategoryId() {
      return categoryId;
    }
    public void setCategoryId(Long categoryId) {
      this.categoryId = categoryId;
    }
    public Integer getStock() {
      return stock;
    }
    public void setStock(Integer stock) {
      this.stock = stock;
    }
    public String getImageUrl() {
      return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
      this.imageUrl = imageUrl;
    }
    public String getBrand() {
      return brand;
    }
    public void setBrand(String brand) {
      this.brand = brand;
    }
    public BigDecimal getWeight() {
      return weight;
    }
    public void setWeight(BigDecimal weight) {
      this.weight = weight;
    }
    public String getWarranty() {
      return warranty;
    }
    public void setWarranty(String warranty) {
      this.warranty = warranty;
    }

}
