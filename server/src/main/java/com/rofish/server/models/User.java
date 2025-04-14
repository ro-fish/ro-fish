package com.rofish.server.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private String email;
    @NotNull
    private String fullName;

    @NotNull
    private String password;
    @NotNull
    private String passwordSalt;
    @NotNull
    private boolean isAdmin;

    public User(String email, String fullName, String password, String passwordSalt, boolean isAdmin) {
        this.email = email;
        this.fullName = fullName;
        this.password = password;
        this.passwordSalt = passwordSalt;
        this.isAdmin = isAdmin;
    }

    public User() {
    }

    public String getPassword() {
        return password;
    }

    public String getPasswordSalt() {
        return passwordSalt;
    }

    public boolean isAdmin() {
        return isAdmin;
    }
}
