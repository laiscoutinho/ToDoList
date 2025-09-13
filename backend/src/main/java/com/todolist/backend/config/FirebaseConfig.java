package com.todolist.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import javax.annotation.PostConstruct;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.core.io.ClassPathResource;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Configuração do Firebase para o backend.
 * Inicializa a conexão com o Firebase usando credenciais do serviço.
 */
@Configuration
public class FirebaseConfig {

    /**
     * Método executado após a criação do bean.
     * Realiza a inicialização do Firebase com o arquivo de credenciais.
     */

    @Value("${firebase.credentials.path}")
    private String firebaseKeyPath;

    @PostConstruct
    public void init() throws IOException {
        try {
            FileInputStream serviceAccount = new FileInputStream(firebaseKeyPath);

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
            System.out.println("Firebase inicializado com sucesso!");
        } catch (Exception e) {
            System.err.println("Erro ao inicializar o Firebase:");
            e.printStackTrace();
        }
    }
}
