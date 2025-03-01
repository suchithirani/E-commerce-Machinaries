package com.machine.backend.services;

import com.machine.backend.Dto.OrderDto;
import com.machine.backend.models.Order;
import com.machine.backend.models.User;
import com.machine.backend.repository.OrderRepository;
import com.machine.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public Order createOrder(OrderDto orderDto) {
        User user = userRepository.findById(orderDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(orderDto.getOrderDate());
        order.setTotalPrice(orderDto.getTotalPrice());
        order.setStatus(orderDto.getStatus());
        order.setShippingAddress(orderDto.getShippingAddress());
        order.setTrackingNumber(orderDto.getTrackingNumber());
        order.setTax(orderDto.getTax());

        return orderRepository.save(order);
    }

    public List<OrderDto> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);

        return orders.stream().map(order -> {
            OrderDto dto = new OrderDto();
            dto.setUserId(order.getUser().getId());
            dto.setOrderDate(order.getOrderDate());
            dto.setTotalPrice(order.getTotalPrice());
            dto.setStatus(order.getStatus());
            dto.setShippingAddress(order.getShippingAddress());
            dto.setTrackingNumber(order.getTrackingNumber());
            dto.setTax(order.getTax());
            return dto;
        }).collect(Collectors.toList());
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    public void deleteOrderById(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
        } else {
            throw new RuntimeException("Order not found with ID: " + id);
        }
    }
}
