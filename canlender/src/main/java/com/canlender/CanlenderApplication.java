package com.canlender;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.canlender")
public class CanlenderApplication {

	public static void main(String[] args) {
		SpringApplication.run(CanlenderApplication.class, args);
	
	}

}
