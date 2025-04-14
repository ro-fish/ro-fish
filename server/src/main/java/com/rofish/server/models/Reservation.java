package com.rofish.server.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @ManyToOne
    private User user;
    @NotNull
    @ManyToOne
    private FishingSpot fishingSpot;

    @NotNull
    private LocalDateTime reservationDate;
}
