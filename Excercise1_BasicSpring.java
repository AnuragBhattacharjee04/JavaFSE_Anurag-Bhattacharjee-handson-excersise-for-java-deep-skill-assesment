package com.cognizant;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.cognizant.service.LibraryService;
public class Exercise1_BasicSpring {

    public static void main(String[] args) {
        System.out.println("=== Exercise 1: Basic Spring Application ===\n");
        ApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");
        LibraryService libraryService = context.getBean(LibraryService.class);
        libraryService.displayBooks();
        LibraryService namedService =
                (LibraryService) context.getBean("libraryService");
        System.out.println("\nBean by name: " + namedService.getClass().getSimpleName());
        LibraryService s1 = context.getBean(LibraryService.class);
        LibraryService s2 = context.getBean(LibraryService.class);
        System.out.println("Singleton check (s1 == s2): " + (s1 == s2));

        ((ClassPathXmlApplicationContext) context).close();
    }
}