package com.machine.backend.services;

import com.machine.backend.models.Product;
import java.util.Optional;
import com.machine.backend.Dto.ProductDto;
import com.machine.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setCategoryId(productDto.getCategoryId());
        product.setStock(productDto.getStock());
        product.setImageUrl(productDto.getImageUrl());
        product.setBrand(productDto.getBrand());
        product.setWeight(productDto.getWeight());
        product.setWarranty(productDto.getWarranty());

        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    
}
