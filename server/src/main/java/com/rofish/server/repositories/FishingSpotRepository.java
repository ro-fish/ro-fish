package com.rofish.server.repositories;

import com.rofish.server.models.FishingSpot;
import org.springframework.data.repository.CrudRepository;

public interface FishingSpotRepository extends CrudRepository<FishingSpot, Long> {
    FishingSpot getFishingSpotsById(long id);
}
