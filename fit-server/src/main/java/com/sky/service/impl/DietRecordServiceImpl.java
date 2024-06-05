package com.sky.service.impl;

import com.sky.entity.DietRecord;
import com.sky.mapper.DietRecordMapper;
import com.sky.service.DietRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DietRecordServiceImpl implements DietRecordService {

    @Autowired
    private DietRecordMapper dietRecordMapper;

    @Override
    public void insertDietRecord(DietRecord dietRecord) {
        dietRecordMapper.insertDietRecord(dietRecord);
    }

    @Override
    public void updateDietRecord(DietRecord dietRecord) {
        dietRecordMapper.updateDietRecord(dietRecord);
    }

    @Override
    public void deleteDietRecord(Long id) {
        dietRecordMapper.deleteDietRecord(id);
    }

    @Override
    public List<DietRecord> getDietRecordsByDate(String date) {
        return dietRecordMapper.findByDate(date);
    }


}
