package com.canlender.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.canlender.entity.Employee;
import com.canlender.entity.Leave;
import com.canlender.entity.LeaveRequest;
import com.canlender.repository.LeaveRepository;

@Service
	public class LeaveServiceImpl implements LeaveService {

	    @Autowired
	    private LeaveRepository leaveRepository;

	  

	    @Override
	    public List<Leave> getLeaveHistory(Long employeeId) {
	        return leaveRepository.findByEmployeeId(employeeId);
	    }



		@Override
		public void applyForLeave(LeaveRequest leaveRequest) {
			// TODO Auto-generated method stub
			
		}
	
}
