package com.sky.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DietRecord {
    private Long id;
    private Date date;
    private String meal;
    private String foodname;
    private int foodquantity;
    private int calorieIntake;
    private int totalCalories;
}
