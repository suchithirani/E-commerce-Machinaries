package com.machine.backend.repository;

import com.machine.backend.models.Operator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OperatorRepository extends JpaRepository<Operator, Long> {
    // Custom query methods can be added here
    boolean existsByEmail(String email);
}