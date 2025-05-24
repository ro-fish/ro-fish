package com.rofish.server.api.reservations.dtos;

import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;

public record ReservationCreationData(@NotEmpty Long fishingSpotId,
                                      @NotEmpty LocalDate reservationDate,
                                      @NotEmpty Long invitedPeople) {

}
