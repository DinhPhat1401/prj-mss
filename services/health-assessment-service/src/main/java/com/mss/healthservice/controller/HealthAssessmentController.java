package com.mss.healthservice.controller;

import com.mss.healthservice.dto.FRIResult;
import com.mss.healthservice.service.FRICalculator;
import com.mss.healthservice.service.KafkaHealthProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/health")
@RequiredArgsConstructor
public class HealthAssessmentController {

    private final FRICalculator friCalculator;
    private final KafkaHealthProducer kafkaHealthProducer;

    @PostMapping("/assess/{userId}")
    public ResponseEntity<FRIResult> assessHealth(
            @PathVariable UUID userId,
            @RequestParam(defaultValue = "72.0") double currentRHR,
            @RequestParam(defaultValue = "65.0") double baseRHR,
            @RequestParam(defaultValue = "7.5") double sleepHours) {

        FRIResult result = friCalculator.calculateFRI(userId, currentRHR, baseRHR, sleepHours);
        kafkaHealthProducer.publishHealthStatusUpdated(result);
        return ResponseEntity.ok(result);
    }
}
