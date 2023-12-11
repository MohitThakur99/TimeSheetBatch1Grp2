package com.canlender.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.canlender.entity.TimesheetEntry;
import com.canlender.service.TimeSheetService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/timesheet/entry")
public class TimesheetController {

    @Autowired
    private TimeSheetService timeSheetService;

    @GetMapping("/timesheet")
    public List<TimesheetEntry> getAllTimeSheetEntries() {
        return timeSheetService.getAllTimeSheetEntries();
    }

    @PostMapping
    public ResponseEntity<TimesheetEntry> saveTimesheetEntry(@RequestBody TimesheetEntry timesheetEntry) {
        TimesheetEntry savedEntry = timeSheetService.saveTimeSheetEntry(timesheetEntry);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEntry);
    }

  

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTimeSheetEntry(@PathVariable Long id) {
        try {
            timeSheetService.deleteTimeSheetEntry(id);
            return ResponseEntity.ok("Timesheet entry deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting timesheet entry");
        }
    }
}
