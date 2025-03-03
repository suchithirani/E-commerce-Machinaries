package com.machine.backend.services;

import com.machine.backend.Dto.ReviewDto;
import com.machine.backend.models.Review;
import com.machine.backend.models.Product;
import com.machine.backend.models.User;
import com.machine.backend.repository.ReviewRepository;
import com.machine.backend.repository.UserRepository;
import com.machine.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public void addReview(ReviewDto reviewDto) {
        User user = userRepository.findById(reviewDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(reviewDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setRating(reviewDto.getRating());
        review.setComment(reviewDto.getComment());

        reviewRepository.save(review);
    }

    public List<ReviewDto> getAllReviews() {
        return reviewRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Optional<ReviewDto> getReviewById(Long id) {
        return reviewRepository.findById(id).map(this::convertToDto);
    }

    public boolean deleteReview(Long id) {
        Optional<Review> review = reviewRepository.findById(id);
        if (review.isPresent()) {
            reviewRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    private ReviewDto convertToDto(Review review) {
        ReviewDto dto = new ReviewDto();
        dto.setId(review.getId());
        dto.setUserId(review.getUser().getId());
        dto.setProductId(review.getProduct().getProductId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt().toString());
        return dto;
    }
}
