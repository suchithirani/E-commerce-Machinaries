package com.machine.backend;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
        initializeFirebase();  // Call Firebase initialization
        System.out.println("Success......");
    }

    private static void initializeFirebase() {
        try {
            // Load the service account key file
            InputStream serviceAccount = BackendApplication.class.getClassLoader().getResourceAsStream("firebase.json");

            if (serviceAccount == null) {
                throw new IOException("Service account key file not found in resources");
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("✅ Firebase initialized successfully!");
            }
        } catch (IOException e) {
            System.err.println("❌ Error Initializing Firebase: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
