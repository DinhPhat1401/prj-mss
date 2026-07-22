package com.mss.recommendationservice.dto;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class RecommendationRequest {
    private UUID userId;
    private Double targetCalories;
    private String fitnessGoal;
    private Double friScore;
    private String healthStatus;
    private Double alphaIntensity;
    private List<String> blacklist;
}
