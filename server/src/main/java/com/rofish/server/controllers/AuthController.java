package com.rofish.server.controllers;

import com.rofish.server.views.AuthView;
import com.rofish.server.components.services.AuthManager;
import com.rofish.server.components.services.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
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

    @Operation(
            summary = "Register a new user.",
            description = "Registers a new user in the database.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "User registered successfully."),
                    @ApiResponse(responseCode = "400", description = "Invalid register data."),
                    @ApiResponse(responseCode = "409", description = "User already exists.")
            }
    )
    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<String> register(@Valid @RequestBody AuthView request) {
        if (authenticationManager.registerUser(request.email(), request.fullName(), request.password())) {
            return ResponseEntity.ok().body("Registered successfully.");
        }

        return ResponseEntity.status(409).body("User already exists.");
    }

    @Operation(
            summary = "Login",
            description = "Log in a user and return a JWT token for the session.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Login successful."),
                    @ApiResponse(responseCode = "401", description = "Invalid password or user does not exist.")
            }
    )
    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<TokenResponse> login(@RequestBody AuthView request) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(request.email(), request.password());
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            ResponseCookie cookie = ResponseCookie.from("auth", jwtTokenProvider.generateToken(authentication)).httpOnly(true).path("/").maxAge(3600).sameSite("Strict").build();

            TokenResponse response = new TokenResponse(jwtTokenProvider.generateToken(authentication));
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(response);
        } catch (UsernameNotFoundException | BadCredentialsException e) {
            return ResponseEntity.status(401).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping(value = "/me")
    public ResponseEntity<String> getMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        String username = authentication.getName();
        return ResponseEntity.ok(username);
    }

    @GetMapping(value = "/logout")
    public ResponseEntity<String> logout() {
        ResponseCookie cookie = ResponseCookie.from("auth", "").httpOnly(true).path("/").maxAge(0).sameSite("Strict").build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("Logged out successfully.");
    }

    public record TokenResponse(String token) {
    }
}
