package com.rofish.server.components.services;

import com.rofish.server.models.User;
import com.rofish.server.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class AuthManager implements AuthenticationManager {

    private final UserRepository userRepository;

    public AuthManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean registerUser(String email, String fullName, String password) {
        if (userRepository.existsByEmail(email)) {
            return false;
        }

        final String salt = BCrypt.gensalt();
        final String hashedPassword = BCrypt.hashpw(password, salt);

        final User user = new User(email, fullName, hashedPassword, salt, false);
        userRepository.save(user);
        return true;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        final String name = authentication.getName();
        final String password = (String) authentication.getCredentials();

        if (!userRepository.existsByEmail(name)) {
            throw new UsernameNotFoundException("User " + authentication.getName() + " not found");
        }

        final User user = userRepository.getUserByEmail(authentication.getName());
        final String hashedPassword = BCrypt.hashpw(password, user.getPasswordSalt());

        if (!user.getPassword().equals(hashedPassword)) {
            throw new BadCredentialsException("Invalid password for user " + name);
        }

        return new UsernamePasswordAuthenticationToken(name, hashedPassword, new ArrayList<>() /* TODO: authorities */);
    }
}
