package com.machine.backend.models;

import jakarta.persistence.*;
import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonBackReference 
    private Order order;
    

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore
    private Product product;
    


    private int quantity;
    private BigDecimal subtotal;
    public Long getOrderItemId() {
      return orderItemId;
    }
    public void setOrderItemId(Long orderItemId) {
      this.orderItemId = orderItemId;
    }
    public Order getOrder() {
      return order;
    }
    public void setOrder(Order order) {
      this.order = order;
    }
    public Product getProduct() {
      return product;
    }
    public void setProduct(Product product) {
      this.product = product;
    }
    public int getQuantity() {
      return quantity;
    }
    public void setQuantity(int quantity) {
      this.quantity = quantity;
    }
    public BigDecimal getSubtotal() {
      return subtotal;
    }
    public void setSubtotal(BigDecimal subtotal) {
      this.subtotal = subtotal;
    }
}
