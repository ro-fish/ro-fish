package com.rofish.server.controllers;

import com.rofish.server.models.FishingSpot;
import com.rofish.server.models.Reservation;
import com.rofish.server.models.User;
import com.rofish.server.repositories.FishingSpotRepository;
import com.rofish.server.repositories.ReservationRepository;
import com.rofish.server.repositories.UserRepository;
import com.rofish.server.views.ReservationView;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final FishingSpotRepository spotRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    public ReservationController(FishingSpotRepository spotRepository, ReservationRepository reservationRepository, UserRepository userRepository) {
        this.spotRepository = spotRepository;
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
    }

    @GetMapping(value = "/by-date", produces = "application/json")
    public ResponseEntity<List<ReservationView>> getReservations(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        List<ReservationView> reservations = new ArrayList<>();
        reservationRepository.getAllByReservationDate(date).forEach(reservation -> reservations.add(new ReservationView(reservation)));
        return ResponseEntity.ok().body(reservations);
    }

    @GetMapping(value = "/by-user", produces = "application/json")
    public ResponseEntity<List<ReservationView>> getReservations() {
        return ResponseEntity.noContent().build(); // TODO implement this
    }

    @PostMapping(value = "/reserve", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> reserve(@Valid @RequestBody ReservationView reservation) {
        User user = userRepository.getUserByEmail("root@rofish.admin.ro"); // FIXME get user by who sent the request
        FishingSpot spot = spotRepository.getFishingSpotsById(reservation.fishingSpotId());

        if (user == null || spot == null) {
            return ResponseEntity.badRequest().body("Invalid request");
        }

        reservationRepository.save(new Reservation(user, spot, reservation.reservationDate()));
        return ResponseEntity.ok().body("Reservation added successfully");
    }
}
