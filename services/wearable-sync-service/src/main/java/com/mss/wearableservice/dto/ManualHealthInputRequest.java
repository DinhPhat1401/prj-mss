package com.mss.wearableservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class ManualHealthInputRequest {
    @NotNull
    private UUID userId;

    private Double sleepHours;
    private Double restingHeartRate;
    private Integer fatigueLevel; // 1 (Energized) to 5 (Exhausted)
    private String notes;
}
