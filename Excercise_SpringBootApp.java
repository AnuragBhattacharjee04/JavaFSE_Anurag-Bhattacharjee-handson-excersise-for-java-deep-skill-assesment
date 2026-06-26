package com.cognizant;

import com.cognizant.service.LibraryService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
@SpringBootApplication
public class Exercise4_SpringBootApp {

    public static void main(String[] args) {
        SpringApplication.run(Exercise4_SpringBootApp.class, args);
    }
    @Bean
    public CommandLineRunner run(LibraryService libraryService) {
        return args -> {
            System.out.println("\n=== Exercise 4: Spring Boot Application Running ===\n");
            libraryService.displayBooks();
            libraryService.addBook("Spring Boot in Practice — Somnath Musib");
            System.out.println("\nAfter adding new book:");
            libraryService.displayBooks();
        };
    }
}