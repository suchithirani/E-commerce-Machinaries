package com.machine.backend.Dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserDto {
    @JsonProperty("firebaseUid")
    private String firebaseUid;  

    private String email;
    private String password;
    private String name;
    private String address;
    private String phone;
    private String role; // Added role field
    private LocalDateTime localDateTime; // Added localDateTime field

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getFirebaseUid() { return firebaseUid; }
    public void setFirebaseUid(String firebaseUid) { this.firebaseUid = firebaseUid; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public LocalDateTime getLocalDateTime() { return localDateTime; }
    public void setCreatedAt(LocalDateTime localDateTime) { this.localDateTime = localDateTime; }
}
