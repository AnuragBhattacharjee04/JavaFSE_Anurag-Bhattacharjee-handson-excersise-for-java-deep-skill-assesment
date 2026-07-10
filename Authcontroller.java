package com.cognizant.controller;

import com.cognizant.model.AuthRequest;
import com.cognizant.model.AuthResponse;
import com.cognizant.security.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "JWT login endpoint")
public class AuthController {

    @Autowired private AuthenticationManager authManager;
    @Autowired private JwtUtil               jwtUtil;

    @PostMapping("/login")
    @Operation(summary = "Login and receive JWT token")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(), request.getPassword()));

            String token = jwtUtil.generateToken(request.getUsername());
            return ResponseEntity.ok(new AuthResponse(token, request.getUsername()));

        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid username or password. Use admin/admin123 or user/user123");
        }
    }
}