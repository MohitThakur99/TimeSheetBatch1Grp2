package com.canlender.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.canlender.entity.Employee;
import com.canlender.repository.EmployeeRepository;


	@Service
	public class EmployeeDetailsService implements UserDetailsService {

	    private final EmployeeRepository employeeRepository;

	    public EmployeeDetailsService(EmployeeRepository employeeRepository) {
	        this.employeeRepository = employeeRepository;
	    }

	    @Override
	    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	        Employee employee = employeeRepository.findByEmail(email)
	                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

	        // Assuming Employee implements UserDetails interface
	        return employee;
	    }
	}
