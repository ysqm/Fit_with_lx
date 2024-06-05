package com.sky.controller.admin;

import com.sky.entity.DietRecord;
import com.sky.service.DietRecordService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diet")
@Slf4j
public class DietRecordController {

    @Autowired
    private DietRecordService dietRecordService;

    @PostMapping("/records")
    @ResponseBody
    public void insertDietRecord(@RequestBody DietRecord dietRecord) {
        dietRecordService.insertDietRecord(dietRecord);
    }

    @PutMapping("/records/{id}")
    public void updateDietRecord(@PathVariable Long id, @RequestBody DietRecord dietRecord) {
        dietRecord.setId(id);
        dietRecordService.updateDietRecord(dietRecord);
    }

    @DeleteMapping("/records/{id}")
    public void deleteDietRecord(@PathVariable Long id) {
        dietRecordService.deleteDietRecord(id);
    }

    @GetMapping("/records")
    public List<DietRecord> getDietRecordsByDate(@RequestParam String date) {
        return dietRecordService.getDietRecordsByDate(date);
    }
}
