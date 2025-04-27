package com.machine.backend.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    private Key getSigningKey() {
        if (secret == null || secret.trim().isEmpty()) {
            System.err.println("WARNING: JWT secret is null or empty!");
        } else {
            System.out.println("JWT secret length: " + secret.length());
        }
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(String email) {
        System.out.println("Generating token for email: " + email);
        System.out.println("Token expiration time: " + expiration + " seconds");
        
        String token = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
        
        System.out.println("Token generated successfully. Length: " + token.length());
        return token;
    }

    public String extractEmail(String token) {
        try {
            System.out.println("Extracting email from token");
            String email = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            System.out.println("Email extracted: " + email);
            return email;
        } catch (Exception e) {
            System.err.println("Error extracting email from token: " + e.getMessage());
            throw e;
        }
    }

    public boolean validateToken(String token) {
        try {
            System.out.println("Validating token");
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            System.out.println("Token validated successfully");
            return true;
        } catch (JwtException e) {
            System.err.println("Invalid JWT token: " + e.getMessage());
            return false;
        } catch (Exception e) {
            System.err.println("Unexpected error during token validation: " + e.getMessage());
            return false;
        }
    }
}