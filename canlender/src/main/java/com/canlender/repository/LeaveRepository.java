package com.canlender.repository;

	import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.canlender.entity.Leave;

import java.util.List;
	
	@Repository
	public interface LeaveRepository extends JpaRepository<Leave, Long> {
	    List<Leave> findByEmployeeId(Long employeeId);
	}

