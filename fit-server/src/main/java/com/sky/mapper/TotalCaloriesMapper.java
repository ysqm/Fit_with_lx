package com.sky.mapper;

import com.sky.entity.TotalCalories;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TotalCaloriesMapper {

    @Insert("INSERT INTO total_calories (date, total_calories) VALUES (#{date}, #{totalCalories})")
    void insertTotalCalories(TotalCalories totalCalories);
}
