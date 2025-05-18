package com.rofish.server.api.reservations.repositories;

import com.rofish.server.api.reservations.models.Reservation;
import com.rofish.server.api.users.models.User;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReservationRepository extends CrudRepository<Reservation, Long> {
    List<Reservation> getReservationsByUser(@NotNull User user, Sort sort);
}
