package com.machine.backend.services;

import com.machine.backend.Dto.OperatorDto;
import com.machine.backend.models.Operator;
import com.machine.backend.repository.OperatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OperatorService {
    @Autowired
    private OperatorRepository operatorRepository;

    public List<Operator> findAll() {
        return operatorRepository.findAll();
    }

    public Optional<Operator> findById(Long id) {
        return operatorRepository.findById(id);
    }

    public Operator save(OperatorDto operatorDTO) {
        Operator operator = new Operator(
                operatorDTO.getName(),
                operatorDTO.getLocation(),
                operatorDTO.getExperienceRange(),
                operatorDTO.isCertified(),
                operatorDTO.isLicensed(),
                operatorDTO.getAvailability(),
                operatorDTO.getEquipmentTypes()
        );
        return operatorRepository.save(operator);
    }

    public Operator update(Long id, OperatorDto operatorDTO) {
        Operator operator = operatorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operator not found with id: " + id));
        
        operator.setName(operatorDTO.getName());
        operator.setLocation(operatorDTO.getLocation());
        operator.setExperienceRange(operatorDTO.getExperienceRange());
        operator.setCertified(operatorDTO.isCertified());
        operator.setLicensed(operatorDTO.isLicensed());
        operator.setAvailability(operatorDTO.getAvailability());
        operator.setEquipmentTypes(operatorDTO.getEquipmentTypes());
        
        return operatorRepository.save(operator);
    }

    public void delete(Long id) {
        operatorRepository.deleteById(id);
    }

    public List<Operator> findByLocation(String location) {
        return operatorRepository.findByLocation(location);
    }

    public List<Operator> findByCertified(boolean certified) {
        return operatorRepository.findByCertified(certified);
    }

    public List<Operator> findByLicensed(boolean licensed) {
        return operatorRepository.findByLicensed(licensed);
    }

    public List<Operator> findByEquipmentType(String equipmentType) {
        return operatorRepository.findByEquipmentTypesContaining(equipmentType);
    }
}