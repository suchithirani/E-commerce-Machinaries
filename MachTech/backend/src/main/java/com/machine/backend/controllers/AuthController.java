package com.machine.backend.controllers;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")  // ✅ This matches "/api/auth/verifyToken"
public class AuthController {

    @PostMapping("/verifyToken")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            // Extract the Bearer token
            String idToken = authorizationHeader.replace("Bearer ", "");

            // Verify Firebase token
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();

            // ✅ Send back UID as a response
            Map<String, String> response = new HashMap<>();
            response.put("uid", uid);
            response.put("message", "Token verified successfully!");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Unauthorized - Invalid Token");
        }
    }
}
