package com.mss.wearableservice.service;

import com.mss.wearableservice.dto.WearableSyncRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WearableDataEventProducer {

    private static final String TOPIC = "wearable.data.synced";
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishWearableSyncedEvent(WearableSyncRequest request) {
        try {
            kafkaTemplate.send(TOPIC, request.getUserId().toString(), request);
            log.info("Successfully published wearable.data.synced event for userId: {}", request.getUserId());
        } catch (Exception e) {
            log.error("Failed to publish wearable event to Kafka", e);
        }
    }
}
