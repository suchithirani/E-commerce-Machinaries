package com.machine.backend.Dto;

public class ReviewDto {
    private Long id;
    private Long userId;
    private Long productId;
    private int rating;
    private String comment;
    private String createdAt;
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
    public int getRating() {
      return rating;
    }
    public void setRating(int rating) {
      this.rating = rating;
    }
    public String getComment() {
      return comment;
    }
    public void setComment(String comment) {
      this.comment = comment;
    }
    public String getCreatedAt() {
      return createdAt;
    }
    public void setCreatedAt(String createdAt) {
      this.createdAt = createdAt;
    }

    
}