package com.rofish.server.controllers;

import com.rofish.server.views.AuthView;
import com.rofish.server.components.services.AuthManager;
import com.rofish.server.components.services.JwtTokenProvider;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> register(@Valid @RequestBody AuthView request) {
        if (authenticationManager.registerUser(request.email(), request.fullName(), request.password())) {
            return ResponseEntity.ok().body("Registered successfully");
        }

        return ResponseEntity.badRequest().body("User already exists");
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<? /* FIXME */> login(@RequestBody AuthView request) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            AuthResponse.AcceptedAuthResponse response = new AuthResponse.AcceptedAuthResponse("Login successful", jwtTokenProvider.generateToken(authentication));
            return ResponseEntity.ok().body(response);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().body(new AuthResponse("User not found"));
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body(new AuthResponse("Invalid password"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse("Error occurred"));
        }
    }

    public static class AuthResponse {
        private final String message;

        public AuthResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public static class AcceptedAuthResponse extends AuthResponse {
            private final String token;

            public AcceptedAuthResponse(String message, String token) {
                super(message);
                this.token = token;
            }

            public String getToken() {
                return token;
            }
        }
    }
}
