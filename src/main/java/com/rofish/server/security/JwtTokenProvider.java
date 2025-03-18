package com.rofish.server.security;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final Key jwtSecret = Jwts.SIG.HS256.key().build();
    private final long jwtLifetime = 3600000;

    private Key getKey() {
        return jwtSecret;
    }

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtLifetime);

        JwtBuilder builder = Jwts.builder().subject(username).issuedAt(now).expiration(expiryDate).signWith(getKey());
        return builder.compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser().verifyWith((SecretKey) getKey()).build().parseSignedClaims(token).getPayload().getSubject();
    }

    public boolean validateToken(String token) {
        Jwts.parser().verifyWith((SecretKey) getKey()).build().parse(token);
        return true;
    }
}
