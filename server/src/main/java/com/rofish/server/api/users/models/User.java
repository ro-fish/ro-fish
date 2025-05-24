package com.rofish.server.api.users.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "users")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private String email;
    @NotNull
    private String fullName;

    @NotNull
    private String passwordHash;
    @NotNull
    private String passwordSalt;
    @NotNull
    @Setter
    private Boolean isAdmin;
    @NotNull
    @Setter
    private Boolean isActive = true;
}
