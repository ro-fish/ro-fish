package com.rofish.server.repositories;

import com.rofish.server.models.Reservation;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;

public interface ReservationRepository extends CrudRepository<Reservation, Long> {
    Iterable<Reservation> getAllByReservationDate(LocalDate reservationDate);
}
