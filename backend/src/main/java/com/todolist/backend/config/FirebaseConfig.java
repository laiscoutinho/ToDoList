package com.todolist.backend.config;

import org.springframework.context.annotation.Configuration;
import javax.annotation.PostConstruct;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.io.FileInputStream;

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
    @PostConstruct
    public void init() {
        try {
            FileInputStream serviceAccount =
                    new FileInputStream("src/main/resources/serviceAccountKey.json");

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
            System.out.println("Firebase inicializado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
