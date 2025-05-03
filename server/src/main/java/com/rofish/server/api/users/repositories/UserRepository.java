package com.rofish.server.api.users.repositories;

import com.rofish.server.api.users.models.User;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
    boolean existsByEmail(@NotNull String email);
    User getUserByEmail(String email);
}
