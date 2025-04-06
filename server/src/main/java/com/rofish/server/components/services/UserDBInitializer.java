package com.rofish.server.components.services;

import com.rofish.server.models.User;
import com.rofish.server.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

/**
 * Initialize the database with the root account.
 */
@Service
public class UserDBInitializer {

    private static final String ROOT_EMAIL = "root@admin.rofish.ro";
    private static final String ROOT_FULL_NAME = "Cont Administrativ";
    private static final String ROOT_PASSWORD = "root";

    private final UserRepository userRepository;

    public UserDBInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    @Transactional
    public void initRootAccount() {
        if (!userRepository.existsByEmail(ROOT_EMAIL)) {
            final String salt = BCrypt.gensalt();
            final String hashedPassword = BCrypt.hashpw(ROOT_PASSWORD, salt);

            final User root = new User(ROOT_EMAIL, ROOT_FULL_NAME, hashedPassword, salt, true);
            userRepository.save(root);
        }
    }
}
