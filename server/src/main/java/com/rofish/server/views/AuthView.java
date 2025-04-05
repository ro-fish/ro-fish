package com.rofish.server.views;

import jakarta.validation.constraints.NotEmpty;

public record AuthView(@NotEmpty String email, @NotEmpty String fullName, @NotEmpty String password) {
}
