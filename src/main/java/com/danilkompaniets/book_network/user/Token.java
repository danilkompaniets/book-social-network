package com.danilkompaniets.book_network.user;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Token {
    @Id
    @GeneratedValue
    private Integer id;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
    private LocalDateTime validatedAt;

    private String token;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;
}
