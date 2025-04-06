package com.rofish.server.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class FishingSpot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ElementCollection
    private List<Coordinates> perimeter;

    public FishingSpot(String name, List<Coordinates> perimeter) {
        this.name = name;
        this.perimeter = perimeter;
    }

    public FishingSpot() {
    }

    public String getName() {
        return name;
    }

    public List<Coordinates> getPerimeter() {
        return perimeter;
    }

    @Embeddable
    public record Coordinates(double latitude, double longitude) {

        public Coordinates() {
            this(0, 0);
        }
    }
}
