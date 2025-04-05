package com.rofish.server.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
    @NotNull
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private FishingSpot fishingSpot;

    @NotNull
    private LocalDate reservationDate;

    public Reservation() {
    }

    public Reservation(User user, FishingSpot fishingSpot, LocalDate reservationDate) {
        this.user = user;
        this.fishingSpot = fishingSpot;
        this.reservationDate = reservationDate;
    }

    public FishingSpot getFishingSpot() {
        return fishingSpot;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }
}
