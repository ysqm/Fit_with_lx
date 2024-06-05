package com.sky.mapper;

import com.sky.entity.DietRecord;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DietRecordMapper {
    List<DietRecord> findByDate(@Param("date") String date);
    void insertDietRecord(DietRecord dietRecord);
    void updateDietRecord(DietRecord dietRecord);
    void deleteDietRecord(Long id);
}
