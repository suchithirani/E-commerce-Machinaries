package com.machine.backend.controllers;

import com.machine.backend.Dto.UserDto;
import com.machine.backend.models.Product;
import com.machine.backend.models.User;
//import com.machine.backend.services.ProductService;
import com.machine.backend.services.UserService;

import org.apache.http.HttpStatus;
//import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    //private ProductService productService;

    // Register a new user
    @PostMapping("/register")
public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
    System.out.println("Received User Data: " + userDto);  // Debug
    System.out.println("Firebase UID: " + userDto.getFirebaseUid());  // Debug

    if (userDto.getFirebaseUid() == null) {
        return ResponseEntity.status(HttpStatus.SC_BAD_REQUEST)
            .body("Firebase UID is missing or null!");
    }

    userService.createUser(userDto);
    return ResponseEntity.ok("User registered successfully");
}

    

    // Get all users
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Get user by email
    @GetMapping("/{email}")
    public ResponseEntity<Optional<User>> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }


    // Update user by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Long id, @RequestBody UserDto userDto) {
        User updatedUser = userService.updateUserById(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    // Delete user by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok("User deleted successfully.");
    }
    @GetMapping("/{userId}/products")
public ResponseEntity<?> getProductsByUser(@PathVariable Long userId) {
    Optional<User> userOpt = userService.getUserById(userId);

    if (userOpt.isPresent()) {
        User user = userOpt.get();
        List<Product> products = user.getProducts(); // Assuming you use a Set<Product>
        
        return ResponseEntity.ok(products);
    } else {
        return ResponseEntity.status(404).body("User not found!");
    }
}
}
