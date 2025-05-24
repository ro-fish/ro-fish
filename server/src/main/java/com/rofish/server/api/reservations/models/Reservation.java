package com.rofish.server.api.reservations.models;

import com.rofish.server.api.fishing_spots.models.FishingSpot;
import com.rofish.server.api.users.models.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
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
    private LocalDate reservationDate;

    @NotNull
    private Long invitedPeople;

    @Setter
    @NotNull
    private Boolean cancelled;

    @NotNull
    private Date lastModify;
}
