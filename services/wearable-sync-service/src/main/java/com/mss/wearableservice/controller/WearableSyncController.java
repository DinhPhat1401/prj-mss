package com.mss.wearableservice.controller;

import com.mss.wearableservice.dto.WearableSyncRequest;
import com.mss.wearableservice.dto.WearableSyncResponse;
import com.mss.wearableservice.service.WearableSyncService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/wearable")
@RequiredArgsConstructor
public class WearableSyncController {

    private final WearableSyncService wearableSyncService;

    @PostMapping("/sync")
    public ResponseEntity<WearableSyncResponse> syncWearableData(@Valid @RequestBody WearableSyncRequest request) {
        return ResponseEntity.ok(wearableSyncService.processSync(request));
    }

    @PostMapping("/manual-input")
    public ResponseEntity<WearableSyncResponse> manualInput(@Valid @RequestBody com.mss.wearableservice.dto.ManualHealthInputRequest request) {
        WearableSyncRequest syncRequest = new WearableSyncRequest();
        syncRequest.setUserId(request.getUserId());
        syncRequest.setProvider(WearableSyncRequest.Provider.MANUAL);

        java.util.List<com.mss.wearableservice.dto.WearableDataPoint> points = new java.util.ArrayList<>();
        if (request.getRestingHeartRate() != null) {
            points.add(new com.mss.wearableservice.dto.WearableDataPoint(
                    com.mss.wearableservice.dto.WearableDataPoint.MetricType.RESTING_HEART_RATE,
                    request.getRestingHeartRate(), "bpm", java.time.LocalDateTime.now()));
        }
        if (request.getSleepHours() != null) {
            points.add(new com.mss.wearableservice.dto.WearableDataPoint(
                    com.mss.wearableservice.dto.WearableDataPoint.MetricType.SLEEP_HOURS,
                    request.getSleepHours(), "hours", java.time.LocalDateTime.now()));
        }
        syncRequest.setDataPoints(points);

        return ResponseEntity.ok(wearableSyncService.processSync(syncRequest));
    }
}
