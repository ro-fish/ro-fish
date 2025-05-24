package com.rofish.server.api.users.dtos;

import jakarta.validation.constraints.NotEmpty;

public record LoginData(@NotEmpty String email, @NotEmpty String password) {

}
