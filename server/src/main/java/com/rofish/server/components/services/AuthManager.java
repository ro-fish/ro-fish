package com.rofish.server.components.services;

import com.rofish.server.api.users.models.User;
import com.rofish.server.api.users.repositories.UserRepository;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AuthManager implements AuthenticationManager {

    public static final String USER_AUTHORITY = "USER";
    public static final String ADMIN_AUTHORITY = "ADMIN";

    public static final List<GrantedAuthority> USER_AUTHORITIES = List.of(
        new SimpleGrantedAuthority(USER_AUTHORITY));
    public static final List<GrantedAuthority> ADMIN_AUTHORITIES = List.of(
        new SimpleGrantedAuthority(USER_AUTHORITY),
        new SimpleGrantedAuthority(ADMIN_AUTHORITY)
    );

    private final UserRepository userRepository;

    public AuthManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static List<GrantedAuthority> getUserAuthorities(User user) {
        return user.getIsAdmin() ? ADMIN_AUTHORITIES : USER_AUTHORITIES;
    }

    public boolean registerUser(String email, String fullName, String password) {
        if (userRepository.existsByEmail(email)) {
            return false;
        }

        final String salt = BCrypt.gensalt();
        final String hashedPassword = BCrypt.hashpw(password, salt);

        final User user = User.builder().email(email).fullName(fullName)
            .passwordHash(hashedPassword).passwordSalt(salt).isAdmin(false).isActive(true).build();
        userRepository.save(user);
        return true;
    }

    public static Authentication getAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken
            || !authentication.isAuthenticated()) {
            return null;
        }

        return authentication;
    }

    @Override
    public Authentication authenticate(Authentication authentication)
        throws AuthenticationException {
        final String name = authentication.getName();
        final String password = (String) authentication.getCredentials();

        if (!userRepository.existsByEmail(name)) {
            throw new UsernameNotFoundException("User " + authentication.getName() + " not found");
        }

        final User user = userRepository.getUserByEmail(authentication.getName());
        final String hashedPassword = BCrypt.hashpw(password, user.getPasswordSalt());

        if (!user.getPasswordHash().equals(hashedPassword)) {
            throw new BadCredentialsException("Invalid password for user " + name);
        }

        if (!user.getIsActive()) {
            throw new AccountExpiredException("User " + name + " is not active");
        }

        return new UsernamePasswordAuthenticationToken(name, hashedPassword,
            getUserAuthorities(user));
    }
}
