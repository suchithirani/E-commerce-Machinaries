package com.machine.backend.controllers; // Replace with your actual package name

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api") // Base path for this controller
public class SecureController {

    @GetMapping("/secure-endpoint")
    public ResponseEntity<?> secureEndpoint(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String idToken = authorizationHeader.replace("Bearer ", "");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();

            return ResponseEntity.ok().body("Welcome, User ID: " + uid);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }
}
