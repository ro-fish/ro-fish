package com.rofish.server.controllers;

import com.rofish.server.views.FishingSpotView;
import com.rofish.server.models.FishingSpot;
import com.rofish.server.repositories.FishingSpotRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/fishing-spot")
public class FishingSpotsController {

    private final FishingSpotRepository repository;

    public FishingSpotsController(FishingSpotRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/all")
    public ResponseEntity<List<FishingSpotView>> getAllFishingSpots() {
        List<FishingSpotView> spots = new ArrayList<>();
        repository.findAll().forEach(spot -> spots.add(new FishingSpotView(spot)));
        return ResponseEntity.ok().body(spots);
    }

    @PostMapping(value = "/add", consumes = "application/json")
    public ResponseEntity<String> addFishingSpot(@Valid @RequestBody FishingSpotView spot) {
        repository.save(new FishingSpot(spot.name(), spot.perimeter()));
        return ResponseEntity.ok().body("Fishing spot added successfully");
    }
}
