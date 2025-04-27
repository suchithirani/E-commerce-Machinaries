// package com.machine.backend.services;

// import com.machine.backend.Dto.WishlistDto;
// import com.machine.backend.models.Wishlist;
// import com.machine.backend.models.User;
// import com.machine.backend.models.Product;
// import com.machine.backend.repository.WishlistRepository;
// import com.machine.backend.repository.UserRepository;
// import com.machine.backend.repository.ProductRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.List;
// import java.util.Optional;
// import java.util.Set;
// //import java.util.stream.Collectors;

// @Service
// public class WishlistService {

//     @Autowired
//     private WishlistRepository wishlistRepository;

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private ProductRepository productRepository;

//     public Wishlist addToWishlist(WishlistDto wishlistDto) {
//         if (wishlistDto.getUserId() == null || wishlistDto.getProductId() == null) {
//             throw new IllegalArgumentException("User ID and Product ID cannot be null");
//         }

//         User user = userRepository.findById(wishlistDto.getUserId())
//                 .orElseThrow(() -> new RuntimeException("User not found"));
//         Product product = productRepository.findById(wishlistDto.getProductId())
//                 .orElseThrow(() -> new RuntimeException("Product not found"));

//         Wishlist wishlist = new Wishlist();
//         wishlist.setUser(user);
//         wishlist.setProduct(product);
//         wishlist.setAddedAt(LocalDateTime.now());
//         wishlist.setDeleted(false);

//         return wishlistRepository.save(wishlist);
//     }

//     public List<Wishlist> getWishlistByUser(Long userId) {
//         return wishlistRepository.findByUserIdAndIsDeletedFalse(userId);
//     }

//     public Optional<Wishlist> getWishlistItemById(Long id) {
//         return wishlistRepository.findById(id);
//     }

//     public Set<User> getUsersByProduct(Long productId) {
//         Optional<Product> productOpt = productRepository.findById(productId);
//         return productOpt.map(Product::getUsers).orElse(null);
//     }

//     public boolean removeWishlistItem(Long id) {
//         Optional<Wishlist> wishlistItem = wishlistRepository.findById(id);
    
//         if (wishlistItem.isPresent()) {
//             wishlistRepository.deleteById(id);
//             return true;
//         } else {
//             return false;
//         }
//     }
// }
