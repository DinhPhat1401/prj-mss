package com.mss.healthservice.service;

import com.mss.healthservice.dto.FRIResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaHealthProducer {

    private static final String TOPIC = "health.status.updated";
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishHealthStatusUpdated(FRIResult result) {
        try {
            kafkaTemplate.send(TOPIC, result.getUserId().toString(), result);
            log.info("Published health.status.updated event for userId: {}, FRI score: {}, status: {}",
                    result.getUserId(), result.getFriScore(), result.getStatus());
        } catch (Exception e) {
            log.error("Failed to publish health status event to Kafka", e);
        }
    }
}
