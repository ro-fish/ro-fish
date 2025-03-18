package com.rofish.server.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Component
public class AuthManager implements AuthenticationManager {

    private static final Map<String, String> users = Collections.synchronizedMap(new HashMap<>());

    static {
        users.put("root", "root");
    }

    public boolean registerUser(String user, String password) {
        if (users.containsKey(user)) {
            return false;
        }

        users.put(user, password);
        return true;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (!users.containsKey(authentication.getName())) {
            throw new UsernameNotFoundException("User " + authentication.getName() + " not found");
        }

        if (!authentication.getCredentials().equals(users.get(authentication.getName()))) {
            throw new BadCredentialsException("Invalid password for user " + authentication.getName());
        }

        return new UsernamePasswordAuthenticationToken(authentication.getName(), authentication.getCredentials(), new ArrayList<>());
    }
}
