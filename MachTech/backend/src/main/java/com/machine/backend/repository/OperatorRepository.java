package com.machine.backend.repository;

import com.machine.backend.models.Operator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OperatorRepository extends JpaRepository<Operator, Long> {
    List<Operator> findByLocation(String location);
    List<Operator> findByCertified(boolean certified);
    List<Operator> findByLicensed(boolean licensed);
    List<Operator> findByEquipmentTypesContaining(String equipmentType);
}