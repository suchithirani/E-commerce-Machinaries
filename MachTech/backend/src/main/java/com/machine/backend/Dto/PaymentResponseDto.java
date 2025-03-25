package com.machine.backend.Dto;

import lombok.Data;

@Data
public class PaymentResponseDto {
    private String razorpayOrderId;
    private String razorpayKey;
    private double amount;
    private String currency;
}