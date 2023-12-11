package com.canlender.entity;
import java.sql.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "events")

public class Canlender {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long eventId;

    private String eventName;
    private Date eventDate;
    private boolean isHoliday;
    public Canlender(Long eventId, String eventName, Date eventDate, boolean isHoliday, String country) {
		super();
		this.eventId = eventId;
		this.eventName = eventName;
		this.eventDate = eventDate;
		this.isHoliday = isHoliday;
		this.country = country;
	}
	private String country;
	public Canlender() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getEventId() {
		return eventId;
	}
	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}
	public String getEventName() {
		return eventName;
	}
	public void setEventName(String eventName) {
		this.eventName = eventName;
	}
	public Date getEventDate() {
		return eventDate;
	}
	public void setEventDate(Date eventDate) {
		this.eventDate = eventDate;
	}
	public boolean isHoliday() {
		return isHoliday;
	}
	public void setHoliday(boolean isHoliday) {
		this.isHoliday = isHoliday;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}

    // Constructors, getters, setters
	
}
