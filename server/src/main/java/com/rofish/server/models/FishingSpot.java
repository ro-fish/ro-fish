package com.rofish.server.models;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity
public class FishingSpot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    @ElementCollection
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Coordinates> perimeter;

    public FishingSpot(String name, List<Coordinates> perimeter) {
        this.name = name;
        this.perimeter = perimeter;
    }

    public FishingSpot() {
        this("", List.of());
    }

    public long getId() {
        return id;
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
