package com.canlender.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.canlender.entity.TimesheetEntry;


@Repository
public interface TimesheetEntryRepository extends JpaRepository<TimesheetEntry, Long> {

}
