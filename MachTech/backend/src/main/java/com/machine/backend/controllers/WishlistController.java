// package com.machine.backend.controllers;

// import com.machine.backend.Dto.WishlistDto;
// import com.machine.backend.models.User;
// import com.machine.backend.models.Wishlist;
// import com.machine.backend.services.WishlistService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;
// import java.util.Set;

// @RestController
// @RequestMapping("/api/wishlist")
// public class WishlistController {

//     @Autowired
//     private WishlistService wishlistService;

//     @PostMapping("/add")
//     public ResponseEntity<?> addToWishlist(@RequestBody WishlistDto wishlistDto) {
//         try {
//             Wishlist wishlist = wishlistService.addToWishlist(wishlistDto);
//             return ResponseEntity.ok(wishlist);
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(e.getMessage());
//         }
//     }

//     @GetMapping("/user/{userId}")
//     public List<Wishlist> getWishlistByUser(@PathVariable Long userId) {
//         return wishlistService.getWishlistByUser(userId);
//     }

//     @GetMapping("/{id}")
// public ResponseEntity<?> getWishlistItemById(@PathVariable Long id) {
//     Optional<Wishlist> wishlist = wishlistService.getWishlistItemById(id);
    
//     if (wishlist.isPresent()) {
//         return ResponseEntity.ok(wishlist.get());
//     } else {
//         return ResponseEntity.status(404).body("Wishlist item not found");
//     }
// }


//     @GetMapping("/{productId}/users")
//     public ResponseEntity<?> getUsersByProduct(@PathVariable Long productId) {
//         Set<User> users = wishlistService.getUsersByProduct(productId);
//         if (users != null) {
//             return ResponseEntity.ok(users);
//         } else {
//             return ResponseEntity.status(404).body("Product not found!");
//         }
//     }

//     @DeleteMapping("/remove/{id}")
// public ResponseEntity<?> removeFromWishlist(@PathVariable Long id) {
//     boolean removed = wishlistService.removeWishlistItem(id);
    
//     if (removed) {
//         return ResponseEntity.ok().body("{\"message\": \"Wishlist item removed successfully\"}");
//     } else {
//         return ResponseEntity.status(404).body("{\"error\": \"Wishlist item not found\"}");
//     }
// }

// }
