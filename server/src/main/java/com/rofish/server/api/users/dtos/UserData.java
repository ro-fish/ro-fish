package com.rofish.server.api.users.dtos;

import lombok.Builder;

@Builder
public record UserData(Long id, String email, String fullName, Boolean isAdmin, Boolean isActive) {

}
