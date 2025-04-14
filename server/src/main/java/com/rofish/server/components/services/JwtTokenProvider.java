package com.rofish.server.components.services;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

/**
 * Provider for JWT tokens and operations on them.
 */
@Service
public class JwtTokenProvider {

    private final Key jwtSigningKey = Jwts.SIG.HS256.key().build();
    private static final long jwtLifetime = 3600000;

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtLifetime);

        JwtBuilder builder = Jwts.builder().subject(username).issuedAt(now).expiration(expiryDate).signWith(jwtSigningKey);
        return builder.compact();
    }

    private JwtParser verifyTokenSignature() {
        return Jwts.parser().verifyWith((SecretKey) jwtSigningKey).build();
    }

    public String getUsernameFromToken(String token) {
        return verifyTokenSignature().parseSignedClaims(token).getPayload().getSubject();
    }

    public void validateToken(String token) {
        verifyTokenSignature().parse(token);
    }
}
