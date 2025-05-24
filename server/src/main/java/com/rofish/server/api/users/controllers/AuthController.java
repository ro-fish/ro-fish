package com.rofish.server.api.users.controllers;

import com.rofish.server.api.users.dtos.JwtTokenData;
import com.rofish.server.api.users.dtos.LoginData;
import com.rofish.server.api.users.dtos.RegisterData;
import com.rofish.server.api.users.dtos.RolesData;
import com.rofish.server.components.services.AuthManager;
import com.rofish.server.components.services.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    public static final int COOKIE_MAX_AGE = 3600; // 1 hour

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
    public ResponseEntity<String> register(@Valid @RequestBody RegisterData request) {
        if (authenticationManager.registerUser(request.email(), request.fullName(),
            request.password())) {
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
    public ResponseEntity<JwtTokenData> login(@Valid @RequestBody LoginData request) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                request.email(), request.password());
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            ResponseCookie cookie = ResponseCookie.from("auth",
                    jwtTokenProvider.generateToken(authentication)).httpOnly(true).path("/")
                .maxAge(COOKIE_MAX_AGE).sameSite("Strict").build();

            JwtTokenData response = new JwtTokenData(
                jwtTokenProvider.generateToken(authentication));
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
        } catch (UsernameNotFoundException | BadCredentialsException e) {
            return ResponseEntity.status(401).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(
        summary = "Check user roles",
        description = "Checks permissions of the current user. Returns an empty list if the user is not authenticated.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Roles retrieved successfully (even if user is unauthenticated)."),
        }
    )
    @GetMapping(value = "/roles")
    public ResponseEntity<RolesData> getUserRoles() {
        Authentication authentication = AuthManager.getAuthentication();
        if (authentication == null) {
            return ResponseEntity.ok(new RolesData(Collections.emptyList()));
        }

        List<String> roles = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return ResponseEntity.ok(new RolesData(roles));
    }

    @GetMapping(value = "/logout")
    public ResponseEntity<String> logout() {
        ResponseCookie cookie = ResponseCookie.from("auth", "").httpOnly(true).path("/")
            .maxAge(0) // expire cookie
            .sameSite("Strict").build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body("Logged out successfully.");
    }
}
