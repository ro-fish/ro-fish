package com.rofish.server.api.fishing_spots.dtos;

import com.rofish.server.api.fishing_spots.models.FishingSpot;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record FishingSpotCreationData(@NotEmpty String name,
                                      @NotNull List<FishingSpot.Coordinates> perimeter) {

    public FishingSpotCreationData(FishingSpot spot) {
        this(spot.getName(), spot.getLimits());
    }
}
