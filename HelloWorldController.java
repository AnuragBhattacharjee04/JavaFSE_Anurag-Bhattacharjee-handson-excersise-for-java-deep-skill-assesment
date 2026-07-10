package com.cognizant.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HelloWorldController {
    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello, World! Welcome to Spring Boot 3 REST.";
    }

    @GetMapping("/hello/{name}")
    public String helloName(@PathVariable String name) {
        return "Hello, " + name + "! Greetings from Spring Boot 3.";
    }

    public String greet(
            @RequestParam(defaultValue = "Guest") String name,
            @RequestParam(defaultValue = "en")    String lang) {

        return switch (lang.toLowerCase()) {
            case "hi" -> "नमस्ते, " + name + "!";
            case "fr" -> "Bonjour, " + name + "!";
            case "de" -> "Hallo, " + name + "!";
            case "es" -> "¡Hola, " + name + "!";
            case "ja" -> "こんにちは, " + name + "!";
            default   -> "Hello, " + name + "!";
        };
    }

    public String status() {
        return "Spring REST Service is UP and running! | Time: "
                + java.time.LocalDateTime.now();
    }
}