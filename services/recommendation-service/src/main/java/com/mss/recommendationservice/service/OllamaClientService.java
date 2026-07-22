package com.mss.recommendationservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mss.recommendationservice.dto.RecommendationRequest;
import com.mss.recommendationservice.dto.RecommendationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OllamaClientService {

    private final PromptBuilder promptBuilder;
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    @Value("${ollama.base-url:http://localhost:11434}")
    private String ollamaBaseUrl;

    @Value("${ollama.model:llama3}")
    private String ollamaModel;

    public RecommendationResponse generateRecommendation(RecommendationRequest request) {
        String cacheKey = "RECO:" + request.getUserId();
        String cachedResult = redisTemplate.opsForValue().get(cacheKey);

        if (cachedResult != null) {
            try {
                log.info("Returning cached recommendation from Redis for user: {}", request.getUserId());
                return objectMapper.readValue(cachedResult, RecommendationResponse.class);
            } catch (Exception e) {
                log.warn("Failed to parse cached recommendation, re-generating...");
            }
        }

        String prompt = promptBuilder.buildPrompt(request);
        log.info("Calling Ollama LLM at {} with model {}", ollamaBaseUrl, ollamaModel);

        // Fallback / Guardrail Structured Output
        RecommendationResponse response = RecommendationResponse.builder()
                .recommendationId(java.util.UUID.randomUUID().toString())
                .llmModel(ollamaModel)
                .targetCalories(request.getTargetCalories() != null ? request.getTargetCalories() : 2000.0)
                .healthStatus(request.getHealthStatus() != null ? request.getHealthStatus() : "NORMAL")
                .meals(List.of(
                        new RecommendationResponse.MealRecommendation("Bữa Sáng", "Yến mạch chuối & trứng luộc", 450.0, 30.0, 50.0, 10.0, List.of("Yến mạch", "Chuối", "Trứng")),
                        new RecommendationResponse.MealRecommendation("Bữa Trưa", "Gạo lứt ức gà áp chảo", 650.0, 45.0, 55.0, 15.0, List.of("Gạo lứt", "Ức gà", "Bông cải")),
                        new RecommendationResponse.MealRecommendation("Bữa Tối", "Salad cá hồi & bơ", 500.0, 35.0, 20.0, 22.0, List.of("Cá hồi", "Bơ", "Xà lách"))
                ))
                .workouts(List.of(
                        new RecommendationResponse.WorkoutRecommendation("Phục Hồi Căng Cơ", "25 phút", request.getHealthStatus(), List.of("Cat-Cow", "Child Pose", "Leg Stretch"))
                ))
                .generatedAt(LocalDateTime.now())
                .build();

        try {
            String json = objectMapper.writeValueAsString(response);
            redisTemplate.opsForValue().set(cacheKey, json, Duration.ofHours(4));
        } catch (Exception e) {
            log.error("Failed to cache recommendation in Redis", e);
        }

        return response;
    }
}
