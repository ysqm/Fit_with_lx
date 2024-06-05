package com.sky.service;

import com.sky.entity.DietRecord;

import java.util.List;

public interface DietRecordService {
    void insertDietRecord(DietRecord dietRecord);
    void updateDietRecord(DietRecord dietRecord);
    void deleteDietRecord(Long id);
    List<DietRecord> getDietRecordsByDate(String date);
}
