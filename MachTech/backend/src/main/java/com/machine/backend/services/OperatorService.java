package com.machine.backend.services;

import com.machine.backend.Dto.OperatorDto;
import com.machine.backend.models.Operator;
import com.machine.backend.repository.OperatorRepository;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OperatorService {

    private final OperatorRepository operatorRepository;

    public OperatorService(OperatorRepository operatorRepository) {
        this.operatorRepository = operatorRepository;
    }

    public List<OperatorDto> getAllOperators() {
        return operatorRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public OperatorDto getOperatorById(Long id) {
        Operator operator = operatorRepository.findById(id)
                .orElse(null);
        return operator != null ? convertToDto(operator) : null;
    }

    public List<OperatorDto> createOperators(List<OperatorDto> operatorDtos) {
        List<Operator> operators = operatorDtos.stream()
                .map(this::convertToEntity)
                .collect(Collectors.toList());
        
        List<Operator> savedOperators = operatorRepository.saveAll(operators);
        
        return savedOperators.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public OperatorDto updateOperator(Long id, OperatorDto operatorDto) {
        return operatorRepository.findById(id)
                .map(existingOperator -> {
                    updateOperatorFromDto(existingOperator, operatorDto);
                    Operator updatedOperator = operatorRepository.save(existingOperator);
                    return convertToDto(updatedOperator);
                })
                .orElse(null);
    }

    public boolean deleteOperator(Long id) {
        if (operatorRepository.existsById(id)) {
            operatorRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private OperatorDto convertToDto(Operator operator) {
        OperatorDto dto = new OperatorDto();
        dto.setId(operator.getId());
        dto.setName(operator.getName());
        dto.setAvatar(operator.getAvatar());
        dto.setAvatarBg(operator.getAvatarBg());
        dto.setAvatarColor(operator.getAvatarColor());
        dto.setLocation(operator.getLocation());
        dto.setExperience(operator.getExperience());
        dto.setEquipment(operator.getEquipment());
        dto.setCertified(operator.isCertified());
        dto.setLicensed(operator.isLicensed());
        dto.setPhoneNumber(operator.getPhoneNumber());
        dto.setEmail(operator.getEmail());
        dto.setJoinedDate(operator.getJoinedDate());
        dto.setAvailability(operator.getAvailability());
        dto.setCertifications(operator.getCertifications());
        dto.setPreviousProjects(operator.getPreviousProjects());
        return dto;
    }

    private Operator convertToEntity(OperatorDto dto) {
        Operator operator = new Operator();
        operator.setName(dto.getName());
        operator.setAvatar(dto.getAvatar());
        operator.setAvatarBg(dto.getAvatarBg());
        operator.setAvatarColor(dto.getAvatarColor());
        operator.setLocation(dto.getLocation());
        operator.setExperience(dto.getExperience());
        operator.setEquipment(dto.getEquipment());
        operator.setCertified(dto.isCertified());
        operator.setLicensed(dto.isLicensed());
        operator.setPhoneNumber(dto.getPhoneNumber());
        operator.setEmail(dto.getEmail());
        operator.setJoinedDate(dto.getJoinedDate());
        operator.setAvailability(dto.getAvailability());
        operator.setCertifications(dto.getCertifications());
        operator.setPreviousProjects(dto.getPreviousProjects());
        return operator;
    }

    private void updateOperatorFromDto(Operator operator, OperatorDto dto) {
        operator.setName(dto.getName());
        operator.setAvatar(dto.getAvatar());
        operator.setAvatarBg(dto.getAvatarBg());
        operator.setAvatarColor(dto.getAvatarColor());
        operator.setLocation(dto.getLocation());
        operator.setExperience(dto.getExperience());
        operator.setEquipment(dto.getEquipment());
        operator.setCertified(dto.isCertified());
        operator.setLicensed(dto.isLicensed());
        operator.setPhoneNumber(dto.getPhoneNumber());
        operator.setEmail(dto.getEmail());
        operator.setJoinedDate(dto.getJoinedDate());
        operator.setAvailability(dto.getAvailability());
        operator.setCertifications(dto.getCertifications());
        operator.setPreviousProjects(dto.getPreviousProjects());
    }
}
