package com.mss.wearableservice.service;

import com.mss.wearableservice.dto.WearableSyncRequest;
import com.mss.wearableservice.dto.WearableSyncResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class WearableSyncService {

    private final WearableDataEventProducer eventProducer;

    public WearableSyncResponse processSync(WearableSyncRequest request) {
        log.info("Processing wearable sync for user: {}, provider: {}, data points count: {}",
                request.getUserId(), request.getProvider(),
                request.getDataPoints() != null ? request.getDataPoints().size() : 0);

        int count = request.getDataPoints() != null ? request.getDataPoints().size() : 0;

        // Publish event to Kafka
        eventProducer.publishWearableSyncedEvent(request);

        return WearableSyncResponse.builder()
                .syncId(UUID.randomUUID().toString())
                .status("SUCCESS")
                .processedPoints(count)
                .syncedAt(LocalDateTime.now())
                .build();
    }
}
