package com.canlender.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.canlender.entity.TimesheetEntry;
import com.canlender.repository.TimesheetEntryRepository;

import jakarta.transaction.Transactional;

import java.util.List;

@Service
public class TimeSheetService {

    @Autowired
    private TimesheetEntryRepository timeSheetRepository;

    public List<TimesheetEntry> getAllTimeSheetEntries() {
        return timeSheetRepository.findAll();
    }

    public TimesheetEntry saveTimeSheetEntry(TimesheetEntry timeSheetEntry) {
        return timeSheetRepository.save(timeSheetEntry);
    }

    @Transactional
    public void deleteTimeSheetEntry(Long id) {
        timeSheetRepository.deleteById(id);
    }
}
