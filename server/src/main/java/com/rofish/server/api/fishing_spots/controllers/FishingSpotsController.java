package com.rofish.server.api.fishing_spots.controllers;

import com.rofish.server.api.fishing_spots.dtos.FishingSpotCreationData;
import com.rofish.server.api.fishing_spots.dtos.FishingSpotData;
import com.rofish.server.api.fishing_spots.models.FishingSpot;
import com.rofish.server.api.fishing_spots.repositories.FishingSpotRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/fishing-spots")
public class FishingSpotsController {

    private final FishingSpotRepository repository;

    public FishingSpotsController(FishingSpotRepository repository) {
        this.repository = repository;
    }

    @Operation(summary = "Get all fishing spots.", description = "Retrieves all fishing spots from the database.", responses = {@ApiResponse(responseCode = "200", description = "Fishing spots retrieved successfully.")})
    @GetMapping("/all")
    public ResponseEntity<List<FishingSpotData>> getAllFishingSpots() {
        List<FishingSpotData> spots = new ArrayList<>();
        repository.findAll().forEach(spot -> spots.add(FishingSpotData.builder().fishingSpotId(spot.getId()).name(spot.getName()).perimeter(spot.getLimits()).build()));
        return ResponseEntity.ok().body(spots);
    }

    @Operation(summary = "Add a new fishing spot.", description = "Adds a new fishing spot to the database. Only accessible by users with ADMIN role.", responses = {@ApiResponse(responseCode = "200", description = "Fishing spot added successfully.")})
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/spot", consumes = "application/json")
    public ResponseEntity<String> addFishingSpot(@Valid @RequestBody FishingSpotCreationData spot) {
        repository.save(new FishingSpot(spot.name(), spot.perimeter()));
        return ResponseEntity.ok().body("Fishing spot added successfully.");
    }

    @Operation(summary = "Delete a fishing spot.", description = "Deletes a fishing spot from the database. Only accessible by users with ADMIN role.", parameters = {@Parameter(name = "id", description = "ID of the fishing spot to delete.")}, responses = {@ApiResponse(responseCode = "200", description = "Fishing spot deleted successfully."), @ApiResponse(responseCode = "400", description = "Fishing spot not found.")})
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/spot/{id}")
    public ResponseEntity<String> deleteFishingSpot(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().body("Fishing spot deleted successfully.");
        }

        return ResponseEntity.badRequest().body("Fishing spot not found.");
    }
}
