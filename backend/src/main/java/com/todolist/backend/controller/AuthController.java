package com.todolist.backend.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.todolist.backend.dto.AuthRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação", description = "Endpoints para cadastro e login de usuários via Firebase")
public class AuthController {

    @Value("${firebase.credentials.apikey}")
    private String apiKey;

    // ===================== CADASTRO =====================
    @Operation(
            summary = "Cadastro de usuário",
            description = "Cria um novo usuário no Firebase Authentication.",
            requestBody = @RequestBody(
                    required = true,
                    description = "E-mail e senha do usuário a ser cadastrado",
                    content = @Content(schema = @Schema(
                            implementation = AuthRequest.class,
                            example = "{ \"email\": \"usuario@exemplo.com\", \"password\": \"senha123\" }"
                    ))
            ),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Usuário criado com sucesso"),
                    @ApiResponse(responseCode = "400", description = "Erro ao criar usuário", content = @Content)
            }
    )
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> signUp(@org.springframework.web.bind.annotation.RequestBody AuthRequest body) {
        if (body == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Body não pode ser nulo"));
        }

        if (body.getEmail() == null || body.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email não pode ser vazio"));
        }

        if (body.getPassword() == null || body.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Senha não pode ser vazia"));
        }

        try {
            UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                    .setEmail(body.getEmail())
                    .setPassword(body.getPassword());

            UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

            return ResponseEntity.ok(Map.of(
                    "success", "Usuário criado com sucesso",
                    "uid", userRecord.getUid()
            ));
        } catch (FirebaseAuthException e) {
            String message = e.getMessage();
            if (message.contains("EMAIL_EXISTS")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email já existente"));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", message));
        }
    }

    // ===================== LOGIN =====================
    @Operation(
            summary = "Login de usuário",
            description = "Autentica o usuário no Firebase e retorna um idToken e uid.",
            requestBody = @RequestBody(
                    required = true,
                    description = "E-mail e senha do usuário",
                    content = @Content(schema = @Schema(
                            implementation = AuthRequest.class,
                            example = "{ \"email\": \"usuario@exemplo.com\", \"password\": \"senha123\" }"
                    ))
            ),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Login bem-sucedido com retorno do idToken e uid"),
                    @ApiResponse(responseCode = "401", description = "Credenciais inválidas", content = @Content)
            }
    )
    @PostMapping("/login")
    public ResponseEntity<?> login(@org.springframework.web.bind.annotation.RequestBody AuthRequest body) {
        if (body == null || body.getEmail() == null || body.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Email e senha são obrigatórios"));
        }

        try {
            String url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + apiKey;

            RestTemplate rest = new RestTemplate();
            Map<String, Object> payload = Map.of(
                    "email", body.getEmail(),
                    "password", body.getPassword(),
                    "returnSecureToken", true
            );

            Map<String, Object> response = rest.postForObject(url, payload, Map.class);

            if (response == null || response.get("idToken") == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Credenciais inválidas"));
            }

            String idToken = (String) response.get("idToken");
            String uid = (String) response.get("localId");

            return ResponseEntity.ok(Map.of(
                    "idToken", idToken,
                    "uid", uid
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Credenciais inválidas ou erro de comunicação"));
        }
    }
}
