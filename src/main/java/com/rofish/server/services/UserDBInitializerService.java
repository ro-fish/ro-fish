package com.rofish.server.services;

import com.rofish.server.models.User;
import com.rofish.server.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

/**
 * Service for initializing the database with the root account.
 */
@Service
public class UserDBInitializerService {

    private static final String ROOT_EMAIL = "root@rofish.admin.ro";
    private static final String ROOT_FULL_NAME = "Cont Administrativ";
    private static final String ROOT_PASSWORD = "root";

    private final UserRepository userRepository;

    public UserDBInitializerService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    @Transactional
    public void initRootAccount() {
        if (!userRepository.existsByEmail(ROOT_EMAIL)) {
            User root = new User(ROOT_EMAIL, ROOT_FULL_NAME, ROOT_PASSWORD, true);
            userRepository.save(root);
        }
    }
}
