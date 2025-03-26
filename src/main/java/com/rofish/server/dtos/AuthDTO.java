package com.rofish.server.dtos;

import jakarta.validation.constraints.NotEmpty;

public record AuthDTO(@NotEmpty String email, @NotEmpty String fullName, @NotEmpty String password) {
}
