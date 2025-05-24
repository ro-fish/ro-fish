package com.rofish.server.api.reservations.controllers;

import com.rofish.server.api.fishing_spots.models.FishingSpot;
import com.rofish.server.api.fishing_spots.repositories.FishingSpotRepository;
import com.rofish.server.api.reservations.dtos.ReservationCreationData;
import com.rofish.server.api.reservations.models.Reservation;
import com.rofish.server.api.reservations.repositories.ReservationRepository;
import com.rofish.server.api.reservations.dtos.ReservationData;
import com.rofish.server.api.users.models.User;
import com.rofish.server.components.services.AuthManager;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationRepository reservationRepository;
    private final FishingSpotRepository fishingSpotRepository;

    public ReservationController(ReservationRepository reservationRepository,
        FishingSpotRepository fishingSpotRepository) {
        this.reservationRepository = reservationRepository;
        this.fishingSpotRepository = fishingSpotRepository;
    }

    @PostMapping("/reserve")
    public ResponseEntity<String> reserve(@RequestBody ReservationCreationData reservation) {
        Authentication authentication = AuthManager.getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }

        User user = (User) authentication.getPrincipal();
        FishingSpot spot = fishingSpotRepository.getFishingSpotById(reservation.fishingSpotId());
        Reservation res = Reservation.builder().user(user).fishingSpot(spot)
            .reservationDate(reservation.reservationDate())
            .invitedPeople(reservation.invitedPeople()).cancelled(false).lastModify(new Date())
            .build();
        reservationRepository.save(res);

        return ResponseEntity.ok("Reservation created successfully.");
    }

    @GetMapping("/my-reservations")
    public ResponseEntity<List<ReservationData>> getUserReservations() {
        Authentication authentication = AuthManager.getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }

        User user = (User) authentication.getPrincipal();
        Sort sort = Sort.by(Sort.Direction.DESC, "lastModify").and(Sort.by("reservationDate"));

        List<Reservation> reservations = reservationRepository.getReservationsByUser(user, sort);
        return ResponseEntity.ok(reservations.stream().map(
            res -> ReservationData.builder().id(res.getId())
                .fishingSpotId(res.getFishingSpot().getId())
                .reservationDate(res.getReservationDate()).invitedPeople(res.getInvitedPeople())
                .cancelled(res.getCancelled()).lastModify(res.getLastModify()).build()).toList());
    }

    @PutMapping("/{reservationId}/cancel")
    public ResponseEntity<String> cancelReservation(@PathVariable long reservationId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken
            || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if (reservation == null) {
            return ResponseEntity.status(404).body("Reservation not found.");
        }

        reservation.setCancelled(true);
        reservationRepository.save(reservation);
        return ResponseEntity.ok("Reservation cancelled successfully.");
    }
}
