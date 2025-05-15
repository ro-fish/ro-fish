package com.rofish.server.api.fishing_spots.dtos;

import com.rofish.server.api.fishing_spots.models.FishingSpot;
import lombok.Builder;

import java.util.List;

@Builder
public record FishingSpotData(long fishingSpotId, String name, List<FishingSpot.Coordinates> perimeter) {
}
