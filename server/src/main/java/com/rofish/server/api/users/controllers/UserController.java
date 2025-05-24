package com.rofish.server.api.users.controllers;

import com.rofish.server.api.users.dtos.UserData;
import com.rofish.server.api.users.models.User;
import com.rofish.server.api.users.repositories.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Operation(
        summary = "Get all users.",
        description = "Retrieves all users from the database.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Users retrieved successfully.")
        }
    )
    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UserData>> getAllUsers() {
        List<UserData> userDataList = new ArrayList<>();
        userRepository.findAll().forEach(user -> userDataList.add(
            UserData.builder().id(user.getId()).email(user.getEmail()).fullName(user.getFullName())
                .isAdmin(user.getIsAdmin()).isActive(user.getIsActive()).build()));

        return ResponseEntity.ok(userDataList);
    }

    @Operation(
        summary = "Set a user's admin status.",
        description = "Sets the admin status of a user by their ID. Only admins can set a user as (un)admin.",
        responses = {
            @ApiResponse(responseCode = "200", description = "User admin status updated successfully."),
            @ApiResponse(responseCode = "404", description = "User not found.")
        }
    )
    @PutMapping("/{userId}/set-admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> setAdminRole(@PathVariable Long userId,
        @RequestParam boolean admin) {
        User targetUser = userRepository.findById(userId).orElse(null);
        if (targetUser == null) {
            return ResponseEntity.notFound().build();
        }

        targetUser.setIsAdmin(admin);
        userRepository.save(targetUser);
        return ResponseEntity.ok("User admin status updated successfully.");
    }

    @Operation(
        summary = "Set a user's active status.",
        description = "Sets the active status of a user by their ID. Inactive users cannot log in. Only admins can set a user as (in)active.",
        responses = {
            @ApiResponse(responseCode = "200", description = "User active status updated successfully."),
            @ApiResponse(responseCode = "404", description = "User not found.")
        }
    )
    @PutMapping("/{userId}/set-active")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> setActiveStatus(@PathVariable Long userId,
        @RequestParam boolean active) {
        User targetUser = userRepository.findById(userId).orElse(null);
        if (targetUser == null) {
            return ResponseEntity.notFound().build();
        }

        targetUser.setIsActive(active);
        userRepository.save(targetUser);
        return ResponseEntity.ok("User active status updated successfully.");
    }
}
