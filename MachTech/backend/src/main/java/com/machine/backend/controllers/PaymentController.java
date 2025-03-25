package com.machine.backend.controllers;

import com.machine.backend.Dto.PaymentRequestDto;
import com.machine.backend.Dto.PaymentResponseDto;
import com.machine.backend.Dto.PaymentVerificationDTO;
import com.machine.backend.services.PaymentService;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")  // Changed to plural for REST conventions
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/orders")
    public ResponseEntity<PaymentResponseDto> createPaymentOrder(
            @RequestBody PaymentRequestDto paymentRequest) throws RazorpayException {
        PaymentResponseDto response = paymentService.createOrder(paymentRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verification")
    public ResponseEntity<String> verifyPayment(
            @RequestBody PaymentVerificationDTO verificationDTO) throws RazorpayException {
        String result = paymentService.verifyPayment(verificationDTO);
        return ResponseEntity.ok(result);
    }

    // Additional useful endpoint
    @GetMapping("/orders/{orderId}/status")
    public ResponseEntity<String> getPaymentStatus(
            @PathVariable String orderId) throws RazorpayException {
        String status = paymentService.getPaymentStatus(orderId);
        return ResponseEntity.ok(status);
    }
}