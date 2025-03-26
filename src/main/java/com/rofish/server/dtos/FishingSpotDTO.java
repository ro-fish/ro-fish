package com.rofish.server.dtos;

import com.rofish.server.models.FishingSpot;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record FishingSpotDTO(@NotEmpty String name, @NotNull List<FishingSpot.Coordinates> perimeter) {
    public FishingSpotDTO(FishingSpot spot) {
        this(spot.getName(), spot.getPerimeter());
    }
}
