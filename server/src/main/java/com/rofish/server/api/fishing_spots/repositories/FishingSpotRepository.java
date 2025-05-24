package com.rofish.server.api.fishing_spots.repositories;

import com.rofish.server.api.fishing_spots.models.FishingSpot;
import org.springframework.data.repository.CrudRepository;

public interface FishingSpotRepository extends CrudRepository<FishingSpot, Long> {

    FishingSpot getFishingSpotById(long id);
}
