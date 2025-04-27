package com.machine.backend.controllers;

import com.machine.backend.Dto.OperatorDto;
import com.machine.backend.services.OperatorService;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operators")
public class OperatorController {

    private final OperatorService operatorService;

   
    public OperatorController(OperatorService operatorService) {
        this.operatorService = operatorService;
    }

    @GetMapping
    public ResponseEntity<List<OperatorDto>> getAllOperators() {
        List<OperatorDto> operators = operatorService.getAllOperators();
        return new ResponseEntity<>(operators, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OperatorDto> getOperatorById(@PathVariable Long id) {
        OperatorDto operator = operatorService.getOperatorById(id);
        if (operator != null) {
            return new ResponseEntity<>(operator, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
public ResponseEntity<List<OperatorDto>> createOperatorsBulk(@RequestBody List<OperatorDto> operatorDtos) {
    List<OperatorDto> createdOperators = operatorService.createOperators(operatorDtos);
    return new ResponseEntity<>(createdOperators, HttpStatus.CREATED);
}

    @PutMapping("/{id}")
    public ResponseEntity<OperatorDto> updateOperator(@PathVariable Long id, @RequestBody OperatorDto operatorDto) {
        OperatorDto updatedOperator = operatorService.updateOperator(id, operatorDto);
        if (updatedOperator != null) {
            return new ResponseEntity<>(updatedOperator, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOperator(@PathVariable Long id) {
        boolean deleted = operatorService.deleteOperator(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}