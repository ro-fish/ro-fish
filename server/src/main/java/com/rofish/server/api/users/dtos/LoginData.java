package com.rofish.server.api.users.dtos;

import jakarta.validation.Valid;

public record LoginData(@Valid String email, @Valid String password) {
}
