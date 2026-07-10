package com.cognizant.controller;

import com.cognizant.model.Country;
import com.cognizant.service.CountryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/countries")
@Tag(name = "Country API", description = "CRUD operations for country data")
public class CountryController {

    private final CountryService countryService;

    @Autowired
    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    @Operation(summary = "Get all countries")
    public ResponseEntity<List<Country>> getAllCountries() {
        return ResponseEntity.ok(countryService.findAll());
    }


    @GetMapping("/{id}")
    @Operation(summary = "Get country by ID")
    public ResponseEntity<Country> getById(@PathVariable int id) {
        return countryService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/code/{code}")
    @Operation(summary = "Get country by 3-letter code (e.g. IND, USA)")
    public ResponseEntity<Country> getByCode(@PathVariable String code) {
        return countryService.findByCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/search")
    @Operation(summary = "Search countries by name (partial match)")
    public ResponseEntity<List<Country>> search(@RequestParam String name) {
        return ResponseEntity.ok(countryService.searchByName(name));
    }

    @PostMapping
    @Operation(summary = "Add a new country")
    public ResponseEntity<Country> addCountry(@Valid @RequestBody Country country) {
        Country saved = countryService.save(country);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }


    @PutMapping("/{id}")
    @Operation(summary = "Update an existing country")
    public ResponseEntity<Country> updateCountry(
            @PathVariable int id,
            @Valid @RequestBody Country country) {

        return countryService.update(id, country)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a country by ID")
    public ResponseEntity<Void> deleteCountry(@PathVariable int id) {
        if (countryService.delete(id)) {
            return ResponseEntity.noContent().build();    
        }
        return ResponseEntity.notFound().build();          
    }
}