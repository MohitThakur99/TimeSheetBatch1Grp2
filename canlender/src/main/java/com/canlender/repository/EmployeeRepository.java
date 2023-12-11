package com.canlender.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.canlender.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Additional query methods can be added here if needed
    Optional<Employee> findByEmail(String email);

}
