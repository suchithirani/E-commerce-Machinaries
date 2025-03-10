package com.machine.backend.controllers;

import com.machine.backend.Dto.ReviewDto;
//import com.machine.backend.models.Review;
import com.machine.backend.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public ResponseEntity<?> addReview(@RequestBody ReviewDto reviewDto) {
        try {
            reviewService.addReview(reviewDto);
            return ResponseEntity.ok().body("{\"message\": \"Review added successfully\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/all")
    public List<ReviewDto> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable Long id) {
        Optional<ReviewDto> review = reviewService.getReviewById(id);
        if (review.isPresent()) {
            return ResponseEntity.ok(review.get());
        } else {
            return ResponseEntity.status(404).body("{\"error\": \"Review not found\"}");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        boolean deleted = reviewService.deleteReview(id);
        if (deleted) {
            return ResponseEntity.ok().body("{\"message\": \"Review deleted successfully\"}");
        } else {
            return ResponseEntity.status(404).body("{\"error\": \"Review not found\"}");
        }
    }
}
