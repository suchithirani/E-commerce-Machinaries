package com.machine.backend.Dto;

public class CategoryDto {
  private String categoryName;  // Make sure this matches the request JSON

  public String getCategoryName() {
      return categoryName;
  }

  public void setCategoryName(String categoryName) {
      this.categoryName = categoryName;
  }
}
