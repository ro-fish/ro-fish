package com.rofish.server.controllers;

import com.rofish.server.security.AuthManager;
import com.rofish.server.security.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

class AuthRequest {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}

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
    public ResponseEntity<String> register(@RequestBody AuthRequest request) {
        if (authenticationManager.registerUser(request.getUsername(), request.getPassword())) {
            return ResponseEntity.ok().body("Registered successfully");
        }

        return ResponseEntity.badRequest().body("User already exists");
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<String> login(@RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtTokenProvider.generateToken(authentication);
            return ResponseEntity.ok().body(token);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().body("User not found");
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body("Invalid password");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occurred");
        }
    }
}
