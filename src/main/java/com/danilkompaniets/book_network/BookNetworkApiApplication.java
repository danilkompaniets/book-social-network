package com.danilkompaniets.book_network;

import com.danilkompaniets.book_network.role.Role;
import com.danilkompaniets.book_network.role.RoleRepository;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.logging.Logger;

@EnableJpaAuditing
@EnableAsync
@SpringBootApplication(scanBasePackages = "com.danilkompaniets")

public class BookNetworkApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookNetworkApiApplication.class, args);
    }

    @Bean
    public CommandLineRunner runner(RoleRepository roleRepository) {
        return args -> {
            System.out.println("Checking if default roles exist...");
            if (roleRepository.findByName("USER").isEmpty()) {
                roleRepository.save(Role.builder().name("USER").build());
            } else {
                System.out.println
                        ("Default role 'USER' already exists.");
            }
        };
    }

}
