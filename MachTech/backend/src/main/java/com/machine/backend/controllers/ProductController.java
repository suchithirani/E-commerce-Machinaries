package com.machine.backend.controllers;

//import com.google.cloud.storage.Acl.User;
import com.machine.backend.Dto.ProductDto;
import com.machine.backend.models.Product;
import com.machine.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.Set;
import java.util.List;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public Product addProduct(@RequestBody ProductDto productDto) {
        return productService.addProduct(productDto);
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.status(404).body("Product not found");
        }
    }

    @GetMapping("/{productId}/users")
public ResponseEntity<?> getUsersByProduct(@PathVariable Long productId) {
    Optional<Product> productOpt = productService.getProductById(productId);

    if (productOpt.isPresent()) {
        Set<com.machine.backend.models.User> users = productOpt.get().getUsers();
        return ResponseEntity.ok(users);
    } else {
        return ResponseEntity.status(404).body("Product not found!");
    }
}

    
}
