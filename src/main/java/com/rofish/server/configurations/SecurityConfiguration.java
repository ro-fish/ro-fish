package com.rofish.server.configurations;

import com.rofish.server.components.JwtAuthEntryPoint;
import com.rofish.server.components.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfiguration {

    private final JwtAuthEntryPoint jwtAuthEntryPoint;
    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfiguration(JwtAuthEntryPoint jwtAuthEntryPoint, JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthEntryPoint = jwtAuthEntryPoint;
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests((authorize) -> {
            authorize.requestMatchers("/api/auth/**").permitAll();
//            authorize.anyRequest().authenticated(); TODO: Enable authentication for all requests
            authorize.anyRequest().permitAll();
        });

        http.exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthEntryPoint));
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
