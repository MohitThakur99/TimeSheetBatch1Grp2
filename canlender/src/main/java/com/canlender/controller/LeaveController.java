package com.canlender.controller;

	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.http.HttpStatus;
	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.*;

import com.canlender.entity.Leave;
import com.canlender.entity.LeaveRequest;
import com.canlender.service.LeaveService;

import java.util.List;

	@RestController
	@RequestMapping("/api/leave")
	public class LeaveController {

	    @Autowired
	    private LeaveService leaveService;

	    // Apply for leave
	    @PostMapping("/apply")
	    public ResponseEntity<String> applyForLeave(@RequestBody LeaveRequest leaveRequest) {
	        leaveService.applyForLeave(leaveRequest);
	        return new ResponseEntity<>("Leave applied successfully", HttpStatus.OK);
	    }

	    // Get leave history for an employee
	    @GetMapping("/history/{employeeId}")
	    public List<Leave> getLeaveHistory(@PathVariable Long employeeId) {
	        return leaveService.getLeaveHistory(employeeId);
	    }
	
}
