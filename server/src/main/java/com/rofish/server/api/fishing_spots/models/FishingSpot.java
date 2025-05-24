package com.rofish.server.api.fishing_spots.models;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Getter
@Entity(name = "fishing_spots")
public class FishingSpot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ElementCollection
    private List<Coordinates> limits;

    public FishingSpot(String name, List<Coordinates> limits) {
        this.name = name;
        this.limits = limits;
    }

    public FishingSpot() {
    }

    @Embeddable
    public record Coordinates(double latitude, double longitude) {

        public Coordinates() {
            this(0, 0);
        }
    }
}
