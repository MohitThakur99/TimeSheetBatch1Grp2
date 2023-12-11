package com.canlender.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.canlender.entity.Leave;
import com.canlender.entity.LeaveRequest;

@Service
public interface LeaveService {
	    void applyForLeave(LeaveRequest leaveRequest);
	    List<Leave> getLeaveHistory(Long employeeId);
	}

