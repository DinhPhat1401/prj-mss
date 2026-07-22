package com.mss.recommendationservice.controller;

import com.mss.recommendationservice.dto.RecommendationRequest;
import com.mss.recommendationservice.dto.RecommendationResponse;
import com.mss.recommendationservice.service.OllamaClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/recommendation")
@RequiredArgsConstructor
public class RecommendationController {

    private final OllamaClientService ollamaClientService;

    @PostMapping("/generate")
    public ResponseEntity<RecommendationResponse> generate(@RequestBody RecommendationRequest request) {
        return ResponseEntity.ok(ollamaClientService.generateRecommendation(request));
    }
}
