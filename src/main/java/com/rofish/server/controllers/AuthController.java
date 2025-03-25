package com.rofish.server.controllers;

import com.rofish.server.dtos.AuthDTO;
import com.rofish.server.components.services.AuthManager;
import com.rofish.server.components.services.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

class AuthResponse {
    private final String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String toJson() {
        return "{\"token\":\"" + token + "\"}";
    }
}

@CrossOrigin(origins = "*") // Allow React frontend
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthManager authenticationManager;

    public AuthController(JwtTokenProvider jwtTokenProvider, AuthManager authenticationManager) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<String> register(@RequestBody AuthDTO request) {
        if (authenticationManager.registerUser(request.email(), request.password())) {
            return ResponseEntity.ok().body("Registered successfully");
        }

        return ResponseEntity.badRequest().body("User already exists");
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<String> login(@RequestBody AuthDTO request) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            AuthResponse token = new AuthResponse(jwtTokenProvider.generateToken(authentication));
            return ResponseEntity.ok().body(token.toJson());
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().body("User not found");
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body("Invalid password");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occurred");
        }
    }
}
