package com.mss.blacklistservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "food_allergies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodAllergy {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private String allergen; // e.g. PEANUT, SEAFOOD, GLUTEN, LACTOSE

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Severity severity = Severity.HIGH;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum Severity {
        MILD, MODERATE, HIGH, SEVERE
    }
}
