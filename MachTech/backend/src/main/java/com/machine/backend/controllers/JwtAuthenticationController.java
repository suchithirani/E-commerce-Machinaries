package com.machine.backend.controllers;

import com.machine.backend.Dto.JwtResponse;
import com.machine.backend.Dto.LoginRequest;
import com.machine.backend.Dto.RegisterRequest;
import com.machine.backend.models.User;
import com.machine.backend.repository.UserRepository;
import com.machine.backend.utils.JwtTokenUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jwt")
public class JwtAuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    @Autowired
public JwtAuthenticationController(
        AuthenticationManager authenticationManager,
        JwtTokenUtil jwtTokenUtil,
        PasswordEncoder passwordEncoder,
        UserRepository userRepository
) {
    this.authenticationManager = authenticationManager;
    this.jwtTokenUtil = jwtTokenUtil;
    this.passwordEncoder = passwordEncoder;
    this.userRepository = userRepository;
}
    

    @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
    try {
        System.out.println("========== REGISTER ATTEMPT ==========");
        System.out.println("Name: " + registerRequest.getName());
        System.out.println("Email: " + registerRequest.getEmail());
        
        // Check if user already exists
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already in use");
        }
        
        // Create new user
        User newUser = new User();
        newUser.setName(registerRequest.getName());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // password encoding

        userRepository.save(newUser);
        System.out.println("User registered successfully!");

        // Auto-login after registration
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(registerRequest.getEmail(), registerRequest.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtTokenUtil.generateToken(userDetails.getUsername());
        System.out.println("JWT token generated after registration, length: " + token.length());

        return ResponseEntity.ok(new JwtResponse(token));
    } catch (Exception e) {
        System.out.println("Error during registration: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed: " + e.getMessage());
    }
}
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Log the received credentials for debugging
            System.out.println("========== LOGIN ATTEMPT ==========");
            System.out.println("Email: " + loginRequest.getEmail());
            System.out.println("Password: " + (loginRequest.getPassword() != null ? "Provided (length: " + 
                               loginRequest.getPassword().length() + ")" : "Missing"));
            
            // Create authentication token
            UsernamePasswordAuthenticationToken authRequest = 
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
            
            System.out.println("Attempting authentication with AuthenticationManager...");
            
            // Perform authentication
            Authentication authentication = authenticationManager.authenticate(authRequest);
            
            System.out.println("Authentication successful!");
            
            // Get user details from the authenticated principal
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            System.out.println("User authenticated: " + userDetails.getUsername());
            System.out.println("Authorities: " + userDetails.getAuthorities());
            
            // Generate JWT token
            String token = jwtTokenUtil.generateToken(userDetails.getUsername());
            System.out.println("JWT token generated, length: " + token.length());
            
            // Return the token
            return ResponseEntity.ok(new JwtResponse(token));
        } catch (BadCredentialsException e) {
            System.out.println("Authentication failed: Bad credentials");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception e) {
            System.out.println("Unexpected error during authentication: " + e.getClass().getName());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Authentication failed: " + e.getMessage());
        }
    }
    
    // Add a test endpoint to verify JWT authentication
    @PostMapping("/test")
    public ResponseEntity<?> testAuth() {
        return ResponseEntity.ok("JWT Authentication successful!");
    }
}