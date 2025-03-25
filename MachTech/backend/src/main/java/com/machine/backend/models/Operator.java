package com.machine.backend.models;

import java.util.List;

import jakarta.persistence.*;
@Entity
public class Operator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String location;
    private String experienceRange; // "0-2 Years", "10+ Years", etc.
    private boolean certified;
    private boolean licensed;
    private String availability; // "Available", "Unavailable"
    
    @ElementCollection
    private List<String> equipmentTypes; // "Tower Crane", "Backhoe", etc.
    
    // Constructors, getters, setters
    public Operator() {}
    
    // Additional constructor, getters and setters
}