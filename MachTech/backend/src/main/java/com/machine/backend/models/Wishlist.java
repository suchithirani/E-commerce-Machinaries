package com.machine.backend.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "wishlist")
public class Wishlist {
  
  @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private LocalDateTime addedAt = LocalDateTime.now();

    private boolean isDeleted = false;

    public Long getId() {
      return id;
    }

    public void setId(Long id) {
      this.id = id;
    }

    public User getUser() {
      return user;
    }

    public void setUser(User user) {
      this.user = user;
    }

    public Product getProduct() {
      return product;
    }

    public void setProduct(Product product) {
      this.product = product;
    }

    public LocalDateTime getAddedAt() {
      return addedAt;
    }

    public void setAddedAt(LocalDateTime addedAt) {
      this.addedAt = addedAt;
    }

    public boolean isDeleted() {
      return isDeleted;
    }

    public void setDeleted(boolean isDeleted) {
      this.isDeleted = isDeleted;
    }

    
}
