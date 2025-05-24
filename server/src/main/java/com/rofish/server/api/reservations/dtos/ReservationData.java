package com.rofish.server.api.reservations.dtos;

import lombok.Builder;

import java.util.Date;
import java.time.LocalDate;

@Builder
public record ReservationData(Long id, Long fishingSpotId, LocalDate reservationDate,
                              Long invitedPeople,
                              Boolean cancelled, Date lastModify) {

}
