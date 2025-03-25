package com.machine.backend.Dto;

import lombok.Data;

@Data
public class PaymentRequestDto {
    private double amount;
    private String currency;
    private String receipt; // Optional: Order reference
}