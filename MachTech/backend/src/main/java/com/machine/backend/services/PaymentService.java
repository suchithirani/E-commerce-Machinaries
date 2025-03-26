// package com.machine.backend.services;

// import com.machine.backend.Dto.PaymentRequestDto;
// import com.machine.backend.Dto.PaymentResponseDto;

// import com.machine.backend.Dto.PaymentVerificationDTO;
// import com.machine.backend.models.Payment;
// import com.machine.backend.repository.PaymentRepository;
// import com.machine.utils.RazorpayUtils;
// import com.razorpay.Order;
// import com.razorpay.RazorpayClient;
// import com.razorpay.RazorpayException;
// import org.json.JSONObject;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;


// @Service
// public class PaymentService {

//     @Autowired
//     private RazorpayClient razorpayClient;

//     @Autowired
//     private PaymentRepository paymentRepository;

//     public PaymentResponseDto createOrder(PaymentRequestDto paymentRequest) throws RazorpayException {
//         JSONObject orderRequest = new JSONObject();
//         orderRequest.put("amount", paymentRequest.getAmount() * 100); // Razorpay expects amount in paise
//         orderRequest.put("currency", paymentRequest.getCurrency());
//         orderRequest.put("receipt", paymentRequest.getReceipt());

//         Order order = razorpayClient.orders.create(orderRequest);

//         // Save to DB
//         Payment payment = new Payment();
//         payment.setRazorpayOrderId(order.get("id"));
//         payment.setAmount(paymentRequest.getAmount());
//         payment.setCurrency(paymentRequest.getCurrency());
//         payment.setStatus("CREATED");
//         paymentRepository.save(payment);

//         // Return response
//         PaymentResponseDto response = new PaymentResponseDto();
//         response.setRazorpayOrderId(order.get("id"));
//         response.setRazorpayKey("your_razorpay_key_id"); // From properties
//         response.setAmount(paymentRequest.getAmount());
//         response.setCurrency(paymentRequest.getCurrency());
//         return response;
//     }

//     public String verifyPayment(PaymentVerificationDTO verificationDTO) throws RazorpayException {
//         Payment payment = paymentRepository.findByRazorpayOrderId(verificationDTO.getRazorpayOrderId());
//         if (payment == null) {
//             return "Payment not found";
//         }

//         // Verify signature (Important!)
//         String generatedSignature = RazorpayUtils.generateSignature(
//             verificationDTO.getRazorpayOrderId() + "|" + verificationDTO.getRazorpayPaymentId(),
//             "your_razorpay_key_secret" // From properties
//         );

//         if (generatedSignature.equals(verificationDTO.getRazorpaySignature())) {
//             payment.setRazorpayPaymentId(verificationDTO.getRazorpayPaymentId());
//             payment.setRazorpaySignature(verificationDTO.getRazorpaySignature());
//             payment.setStatus("PAID");
//             paymentRepository.save(payment);
//             return "Payment successful!";
//         } else {
//             payment.setStatus("FAILED");
//             paymentRepository.save(payment);
//             return "Payment verification failed!";
//         }
//     }
// }