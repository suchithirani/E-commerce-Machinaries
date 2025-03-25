package com.machine.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for API endpoints
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers(
                    "/api/payments/orders",
                    "/api/payments/verification",
                    "/api/payments/orders/**/status"
                ).permitAll()
                
                // Secure all other endpoints
                .anyRequest().authenticated()
            )
            .httpBasic(withDefaults -> {}); // Optional: Enable Basic Auth for other endpoints

        return http.build();
    }
}