package com.rofish.server.repositories;

import com.rofish.server.models.User;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
    boolean existsByEmail(@NotNull String email);
    User getUserByEmail(String email);
}
