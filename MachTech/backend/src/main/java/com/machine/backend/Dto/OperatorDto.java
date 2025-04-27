package com.machine.backend.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OperatorDto {
    private Long id;
    private String name;
    private String avatar;
    private String avatarBg;
    private String avatarColor;
    private String location;
    private String experience;
    private List<String> equipment;
    private boolean certified;
    private boolean licensed;
    private String phoneNumber;
    private String email;
    private String joinedDate;
    private String availability;
    private List<String> certifications;
    private List<String> previousProjects;
}