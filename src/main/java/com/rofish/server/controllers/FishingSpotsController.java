package com.rofish.server.controllers;

import com.rofish.server.dtos.FishingSpotDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/fishing-spots")
public class FishingSpotsController {

    @GetMapping("")
    public ResponseEntity<List<FishingSpotDTO>> getFishingSpots() {
        List<FishingSpotDTO> example = List.of(
                new FishingSpotDTO("Lake", 10, 5),
                new FishingSpotDTO("River", 20, 3),
                new FishingSpotDTO("Ocean", 30, 2));

        return ResponseEntity.ok().body(example);
    }
}
