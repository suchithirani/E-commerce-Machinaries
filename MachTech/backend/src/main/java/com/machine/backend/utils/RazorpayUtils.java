package com.machine.backend.utils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class RazorpayUtils {

    private static final String HMAC_SHA256 = "HmacSHA256";

    public static String generateSignature(String data, String secret) {
        try {
            // Validate inputs
            if (data == null || secret == null) {
                throw new IllegalArgumentException("Data and secret must not be null");
            }

            // Initialize HMAC-SHA256 algorithm
            Mac sha256_HMAC = Mac.getInstance(HMAC_SHA256);
            SecretKeySpec secretKey = new SecretKeySpec(
                secret.getBytes(StandardCharsets.UTF_8), 
                HMAC_SHA256
            );
            sha256_HMAC.init(secretKey);

            // Generate the signature
            byte[] hash = sha256_HMAC.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
            
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("HMAC-SHA256 algorithm not available", e);
        } catch (InvalidKeyException e) {
            throw new RuntimeException("Invalid secret key", e);
        } catch (Exception e) {
            throw new RuntimeException("Error generating Razorpay signature", e);
        }
    }
}