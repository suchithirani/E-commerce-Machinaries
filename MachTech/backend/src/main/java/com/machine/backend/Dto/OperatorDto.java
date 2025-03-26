package com.machine.backend.Dto;

import java.util.List;

public class OperatorDto {
    private String name;
    private String location;
    private String experienceRange;
    private boolean certified;
    private boolean licensed;
    private String availability;
    private List<String> equipmentTypes;

    // Constructors
    public OperatorDto() {
    }

    public OperatorDto(String name, String location, String experienceRange, 
                      boolean certified, boolean licensed, String availability, 
                      List<String> equipmentTypes) {
        this.name = name;
        this.location = location;
        this.experienceRange = experienceRange;
        this.certified = certified;
        this.licensed = licensed;
        this.availability = availability;
        this.equipmentTypes = equipmentTypes;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getExperienceRange() {
        return experienceRange;
    }

    public void setExperienceRange(String experienceRange) {
        this.experienceRange = experienceRange;
    }

    public boolean isCertified() {
        return certified;
    }

    public void setCertified(boolean certified) {
        this.certified = certified;
    }

    public boolean isLicensed() {
        return licensed;
    }

    public void setLicensed(boolean licensed) {
        this.licensed = licensed;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public List<String> getEquipmentTypes() {
        return equipmentTypes;
    }

    public void setEquipmentTypes(List<String> equipmentTypes) {
        this.equipmentTypes = equipmentTypes;
    }
}