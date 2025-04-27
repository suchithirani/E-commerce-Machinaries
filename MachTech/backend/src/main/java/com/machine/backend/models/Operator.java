package com.machine.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "operators")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Operator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String avatar;

    @Column(name = "avatar_bg", nullable = false)
    private String avatarBg;

    @Column(name = "avatar_color", nullable = false)
    private String avatarColor;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String experience;

    @ElementCollection
    @CollectionTable(name = "operator_equipment", joinColumns = @JoinColumn(name = "operator_id"))
    @Column(name = "equipment")
    private List<String> equipment;

    @Column(nullable = false)
    private boolean certified;

    @Column(nullable = false)
    private boolean licensed;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "joined_date", nullable = false)
    private String joinedDate;

    @Column(nullable = false)
    private String availability;

    @ElementCollection
    @CollectionTable(name = "operator_certifications", joinColumns = @JoinColumn(name = "operator_id"))
    @Column(name = "certification")
    private List<String> certifications;

    @ElementCollection
    @CollectionTable(name = "operator_previous_projects", joinColumns = @JoinColumn(name = "operator_id"))
    @Column(name = "project")
    private List<String> previousProjects;
}