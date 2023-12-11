package com.canlender.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.canlender.entity.Canlender;

public interface CanlenderRepository extends JpaRepository<Canlender, Long> {

    List<Canlender> findByCountry(String country); 

}

