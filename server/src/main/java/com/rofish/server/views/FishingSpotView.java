package com.rofish.server.views;

import com.rofish.server.models.FishingSpot;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record FishingSpotView(@NotEmpty String name, @NotNull List<FishingSpot.Coordinates> perimeter) {
    public FishingSpotView(FishingSpot spot) {
        this(spot.getName(), spot.getPerimeter());
    }
}
