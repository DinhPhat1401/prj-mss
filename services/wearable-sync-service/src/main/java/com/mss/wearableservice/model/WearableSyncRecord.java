package com.mss.wearableservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "wearable_sync_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WearableSyncRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID userId;

    private String provider;
    private Integer processedPoints;
    private String status;
    private LocalDateTime syncedAt;

    @PrePersist
    protected void onCreate() {
        syncedAt = LocalDateTime.now();
    }
}
