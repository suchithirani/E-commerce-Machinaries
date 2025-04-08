package com.machine.backend.controllers;

import com.machine.backend.Dto.OperatorDto;
import com.machine.backend.models.Operator;
import com.machine.backend.services.OperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
    
@RestController
@RequestMapping("/api/operators")
public class OperatorController {
    @Autowired
    private OperatorService operatorService;

    @GetMapping
    public ResponseEntity<List<Operator>> getAllOperators() {
        List<Operator> operators = operatorService.findAll();
        return new ResponseEntity<>(operators, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Operator> getOperatorById(@PathVariable Long id) {
        Optional<Operator> operator = operatorService.findById(id);
        return operator.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Operator> createOperator(@RequestBody OperatorDto operatorDTO) {
        Operator newOperator = operatorService.save(operatorDTO);
        return new ResponseEntity<>(newOperator, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Operator> updateOperator(@PathVariable Long id, @RequestBody OperatorDto operatorDTO) {
        Operator updatedOperator = operatorService.update(id, operatorDTO);
        return new ResponseEntity<>(updatedOperator, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOperator(@PathVariable Long id) {
        operatorService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<Operator>> getOperatorsByLocation(@PathVariable String location) {
        List<Operator> operators = operatorService.findByLocation(location);
        return new ResponseEntity<>(operators, HttpStatus.OK);
    }

    @GetMapping("/certified/{certified}")
    public ResponseEntity<List<Operator>> getOperatorsByCertification(@PathVariable boolean certified) {
        List<Operator> operators = operatorService.findByCertified(certified);
        return new ResponseEntity<>(operators, HttpStatus.OK);
    }

    @GetMapping("/licensed/{licensed}")
    public ResponseEntity<List<Operator>> getOperatorsByLicense(@PathVariable boolean licensed) {
        List<Operator> operators = operatorService.findByLicensed(licensed);
        return new ResponseEntity<>(operators, HttpStatus.OK);
    }

    @GetMapping("/equipment/{equipmentType}")
    public ResponseEntity<List<Operator>> getOperatorsByEquipmentType(@PathVariable String equipmentType) {
        List<Operator> operators = operatorService.findByEquipmentType(equipmentType);
        return new ResponseEntity<>(operators, HttpStatus.OK);
    }
}