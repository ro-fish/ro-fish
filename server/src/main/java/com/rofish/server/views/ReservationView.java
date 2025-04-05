package com.rofish.server.views;

import com.rofish.server.models.Reservation;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ReservationView(@NotNull long fishingSpotId, @NotNull LocalDate reservationDate) {
    public ReservationView(Reservation reservation) {
        this(reservation.getFishingSpot().getId(), reservation.getReservationDate());
    }
}
