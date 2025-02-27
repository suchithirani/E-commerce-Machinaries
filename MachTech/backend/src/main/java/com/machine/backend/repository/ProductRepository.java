package com.machine.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.machine.backend.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Custom queries (if needed)
    
}
