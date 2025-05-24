package com.rofish.server.api.users.dtos;

import jakarta.validation.constraints.NotEmpty;

public record RegisterData(@NotEmpty String email, @NotEmpty String fullName,
                           @NotEmpty String password) {

}
