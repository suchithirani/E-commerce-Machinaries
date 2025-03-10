package com.machine.backend.services;

import com.machine.backend.Dto.ReviewDto;
import com.machine.backend.models.Review;
import com.machine.backend.repository.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;


    public void addReview(ReviewDto reviewDto) {

        Review review = new Review();
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
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }
}
