package com.rofish.server.api.reservations.dtos;

import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;

public record ReservationCreationData(@NotEmpty long fishingSpotId, @NotEmpty LocalDateTime reservationDate,
                                      @NotEmpty long invitedPeople) {
}
