package com.rofish.server.components.services;

import com.rofish.server.models.User;
import com.rofish.server.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class AuthManager implements AuthenticationManager {

    private final UserRepository userRepository;

    public AuthManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean registerUser(String username, String password) {
        if (userRepository.existsByEmail(username)) {
            return false;
        }

        final User user = new User(username,  "FIXME: full name", password, false);
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

        User user = userRepository.getUserByEmail(authentication.getName());

        if (!user.getPassword().equals(password)) {
            throw new BadCredentialsException("Invalid password for user " + name);
        }

        return new UsernamePasswordAuthenticationToken(name, password, new ArrayList<>() /* TODO: authorities */);
    }
}
