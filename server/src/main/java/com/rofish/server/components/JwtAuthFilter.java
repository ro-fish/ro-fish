package com.rofish.server.components;

import com.rofish.server.components.services.AuthManager;
import com.rofish.server.components.services.JwtTokenProvider;
import com.rofish.server.models.User;
import com.rofish.server.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    public JwtAuthFilter(JwtTokenProvider jwtTokenProvider, UserRepository userRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }

    /**
     * Retrieve the user that made the request based on the JWT token.
     * <p>
     * This method is called for every request. If the token is valid, set the authentication context (user and
     * authorities), to be used in handling the request.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getTokenFromRequest(request);

        try {
            if (!StringUtils.hasText(token)) {
                return;
            }

            try {
                jwtTokenProvider.validateToken(token);
            } catch (Exception e) {
                throw new ServletException("Invalid JWT token", e);
            }

            String username = jwtTokenProvider.getUsernameFromToken(token);

            User user = userRepository.getUserByEmail(username);
            List<GrantedAuthority> grantedAuthorities = AuthManager.getUserAuthorities(user);

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, grantedAuthorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } finally {
            // Continue the chain no matter what
            filterChain.doFilter(request, response);
        }
    }
}
