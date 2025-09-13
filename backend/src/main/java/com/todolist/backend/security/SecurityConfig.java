package com.todolist.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Configuração de segurança da aplicação.
 * Define permissões de acesso e desabilita CSRF.
 */
@Configuration
public class SecurityConfig {

    /**
     * Configura o filtro de segurança principal.
     * Permite acesso livre a /login e /register e aplica configurações básicas de HTTP.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> {}) // Configuração de CORS
                .csrf(csrf -> csrf.disable()) // Desabilita proteção CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/login","/register").permitAll() // Permite acesso livre a login e registro
                        .anyRequest().permitAll() // Todas as outras requisições são permitidas
                )
                .httpBasic(Customizer.withDefaults()); // Configuração básica de autenticação HTTP

        return http.build();
    }
}
