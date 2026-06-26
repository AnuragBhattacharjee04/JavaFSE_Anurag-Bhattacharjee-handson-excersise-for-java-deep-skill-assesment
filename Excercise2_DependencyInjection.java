package com.cognizant;

import com.cognizant.config.AppConfig;
import com.cognizant.service.LibraryService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
public class Exercise2_DependencyInjection {

    public static void main(String[] args) {
        System.out.println("=== Exercise 2: Dependency Injection ===\n");
        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);

        System.out.println("--- Constructor Injection ---");
        LibraryService serviceCI = context.getBean("libraryServiceCI", LibraryService.class);
        serviceCI.displayBooks();

        System.out.println("\n--- Setter Injection ---");
        LibraryService serviceSI = context.getBean("libraryServiceSI", LibraryService.class);
        serviceSI.displayBooks();
        serviceSI.addBook("Microservices Patterns — Chris Richardson");

        context.close();
    }
}