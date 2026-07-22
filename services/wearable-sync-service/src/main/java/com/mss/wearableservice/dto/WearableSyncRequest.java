package com.mss.wearableservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class WearableSyncRequest {
    @NotNull
    private UUID userId;

    @NotNull
    private Provider provider; // APPLE_HEALTH, GOOGLE_FIT, GARMIN, MANUAL

    private List<WearableDataPoint> dataPoints;

    public enum Provider {
        APPLE_HEALTH, GOOGLE_FIT, GARMIN, MANUAL
    }
}
