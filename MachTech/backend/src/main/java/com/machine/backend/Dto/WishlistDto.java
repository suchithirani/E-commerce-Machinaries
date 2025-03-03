package com.machine.backend.Dto;

public class WishlistDto {
  
    private Long id;
    private Long userId;
    private Long productId;
    private String addedAt;
    public Long getId() {
      return id;
    }
    public void setId(Long id) {
      this.id = id;
    }
    public Long getUserId() {
      return userId;
    }
    public void setUserId(Long userId) {
      this.userId = userId;
    }
    public Long getProductId() {
      return productId;
    }
    public void setProductId(Long productId) {
      this.productId = productId;
    }
    public String getAddedAt() {
      return addedAt;
    }
    public void setAddedAt(String addedAt) {
      this.addedAt = addedAt;
    }

}
