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
}
