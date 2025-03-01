package com.machine.backend.controllers;

import com.machine.backend.Dto.OrderItemDto;
import com.machine.backend.models.OrderItem;
import com.machine.backend.services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping("/add")
    public ResponseEntity<?> addOrderItem(@RequestBody OrderItemDto orderItemDto) {
        try {
            OrderItem orderItem = orderItemService.addOrderItem(orderItemDto);
            return ResponseEntity.ok(orderItem);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderItemsByOrderId(@PathVariable Long orderId) {
        List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderId(orderId);

        if (orderItems.isEmpty()) {
            return ResponseEntity.status(404).body("No items found for this order.");
        }

        return ResponseEntity.ok(orderItems);
    }
}
