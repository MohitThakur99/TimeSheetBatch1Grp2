package com.canlender.entity;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;
	import java.util.List;

	@Entity
	public class TimesheetEntry {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String employeeId;
	    private String project;
	    private String status;
	    private int total;
	    
	    @Column(name = "reason")
	    private String reason;

	    @OneToOne
	    @JoinColumn(name = "timesheet_entry_id")
	    private TimesheetEntry timesheetEntry;

	    
	    
	    
	    public String getReason() {
			return reason;
		}

		public void setReason(String reason) {
			this.reason = reason;
		}

		@Temporal(TemporalType.DATE)
	    private Date weekStartDate;

	    @Temporal(TemporalType.DATE)
	    private Date weekEndDate;

	    @ElementCollection
	    private List<String> dates; // Change the type as needed

	    @ElementCollection
	    private List<Integer> hours; // Change the type as needed

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getEmployeeId() {
			return employeeId;
		}

		public void setEmployeeId(String employeeId) {
			this.employeeId = employeeId;
		}

		public String getProject() {
			return project;
		}

		public void setProject(String project) {
			this.project = project;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public int getTotal() {
			return total;
		}

		public void setTotal(int total) {
			this.total = total;
		}

		public Date getWeekStartDate() {
			return weekStartDate;
		}

		public void setWeekStartDate(Date weekStartDate) {
			this.weekStartDate = weekStartDate;
		}

		public Date getWeekEndDate() {
			return weekEndDate;
		}

		public void setWeekEndDate(Date weekEndDate) {
			this.weekEndDate = weekEndDate;
		}

		public List<String> getDates() {
			return dates;
		}

		public void setDates(List<String> dates) {
			this.dates = dates;
		}

		public List<Integer> getHours() {
			return hours;
		}

		public void setHours(List<Integer> hours) {
			this.hours = hours;
		}

		@Override
		public String toString() {
			return "TimesheetEntry [id=" + id + ", employeeId=" + employeeId + ", project=" + project + ", status="
					+ status + ", total=" + total + ", weekStartDate=" + weekStartDate + ", weekEndDate=" + weekEndDate
					+ ", dates=" + dates + ", hours=" + hours + "]";
		}

	    // Getters and setters...

	
		public void updateStatusAndReason(String newStatus, String rejectionReason) {
	        // Update status and reason logic
	        if ("Rejected".equalsIgnoreCase(newStatus) && rejectionReason != null && !rejectionReason.isEmpty()) {
	            this.setStatus(newStatus);
	            this.setReason(rejectionReason);
	        } else if ("Approved".equalsIgnoreCase(newStatus) || "Pending".equalsIgnoreCase(newStatus)) {
	            this.setStatus(newStatus);
	            this.setReason(null);
	        } else {
	            // Handle invalid status values if needed
	            System.out.println("Invalid status value: " + newStatus);
	            return; // or throw an exception
	        }

	     
	    // Existing methods...

	    // Getters and setters...
		}
		
	}
	
	

