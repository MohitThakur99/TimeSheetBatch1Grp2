package com.canlender.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.canlender.entity.Canlender;
import com.canlender.repository.CanlenderRepository;

@Service
public class CanlenderService {
	
	@Autowired
    private CanlenderRepository eventRepository;
	
	public List<Canlender> getEventsByCountry(String country) {
        return eventRepository.findByCountry(country);
    }

}
