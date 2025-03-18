package com.rofish.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

class FishingSpot {
    private final String name;
    private final int fishCount;
    private final int fishWeight;

    public FishingSpot(String name, int fishCount, int fishWeight) {
        this.name = name;
        this.fishCount = fishCount;
        this.fishWeight = fishWeight;
    }

    public String getName() {
        return name;
    }

    public int getFishCount() {
        return fishCount;
    }

    public int getFishWeight() {
        return fishWeight;
    }
}

@RestController
@RequestMapping("/api/fishing-spots")
public class FishingSpotsController {

    @GetMapping("")
    public ResponseEntity<List<FishingSpot>> getFishingSpots() {
        List<FishingSpot> example = List.of(
                new FishingSpot("Lake", 10, 5),
                new FishingSpot("River", 20, 3),
                new FishingSpot("Ocean", 30, 2));

        return ResponseEntity.ok().body(example);
    }
}
