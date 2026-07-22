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
public class WearableSyncResponse {
    private String syncId;
    private String status;
    private int processedPoints;
    private LocalDateTime syncedAt;
}
