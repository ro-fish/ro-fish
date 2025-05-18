package com.rofish.server.api.reservations.dtos;

import lombok.Builder;

import java.util.Date;
import java.time.LocalDateTime;

@Builder
public record ReservationData(long id, long fishingSpotId, LocalDateTime reservationDate, long invitedPeople,
                              boolean cancelled, Date lastModify) {
}
