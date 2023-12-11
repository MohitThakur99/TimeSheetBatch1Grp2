package com.canlender.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.canlender.entity.Canlender;
import com.canlender.service.CanlenderService;

	@RestController
	@CrossOrigin(origins ="*")
	@RequestMapping("/events")
	public class CanlenderController {

	    @Autowired
	    private CanlenderService eventService;

	    @GetMapping("/country/{country}")
	    public List<Canlender> getEventsByCountry(@PathVariable String country) {
	        return eventService.getEventsByCountry(country);
	    }

	    // Other endpoints as needed
	}
	
	

