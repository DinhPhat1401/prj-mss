package com.mss.healthservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FRIResult {
    private UUID userId;
    private Double friScore; // 0 to 100
    private String status; // NORMAL, FATIGUE, RECOVERY, PEAK
    private Double alphaIntensity; // 0.6 (Fatigue), 1.0 (Normal), 1.2 (Peak)
    private Double currentRHR;
    private Double baseRHR;
    private Double sleepHours;
    private String recommendationReason;
    private LocalDateTime calculatedAt;
}
