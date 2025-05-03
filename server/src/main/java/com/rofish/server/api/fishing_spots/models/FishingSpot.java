package com.rofish.server.api.fishing_spots.models;

import jakarta.persistence.*;

import java.util.List;

@Entity(name = "fishing_spots")
public class FishingSpot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    @ElementCollection
    private List<Coordinates> limits;

    public FishingSpot(String name, List<Coordinates> limits) {
        this.name = name;
        this.limits = limits;
    }

    public FishingSpot() {
    }

    public String getName() {
        return name;
    }

    public List<Coordinates> getLimits() {
        return limits;
    }

    @Embeddable
    public record Coordinates(double latitude, double longitude) {

        public Coordinates() {
            this(0, 0);
        }
    }
}
