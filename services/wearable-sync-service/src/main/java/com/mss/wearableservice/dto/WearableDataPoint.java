package com.mss.wearableservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WearableDataPoint {
    private MetricType metricType;
    private Double value;
    private String unit;
    private LocalDateTime timestamp;

    public enum MetricType {
        HEART_RATE, RESTING_HEART_RATE, STEP_COUNT, ACTIVE_CALORIES, SLEEP_HOURS
    }
}
