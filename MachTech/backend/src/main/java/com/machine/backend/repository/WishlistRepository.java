package com.machine.backend.repository;

import com.machine.backend.models.Wishlist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserIdAndIsDeletedFalse(Long userId);

    @Transactional
    @Modifying
    @Query("UPDATE Wishlist w SET w.isDeleted = true WHERE w.addedAt < :expirationDate")
    void softDeleteExpiredWishlistItems(LocalDateTime expirationDate);
}