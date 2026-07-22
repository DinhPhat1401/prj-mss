package com.mss.recommendationservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationResponse {
    private String recommendationId;
    private String llmModel;
    private Double targetCalories;
    private String healthStatus;
    private List<MealRecommendation> meals;
    private List<WorkoutRecommendation> workouts;
    private LocalDateTime generatedAt;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MealRecommendation {
        private String mealType;
        private String dishName;
        private Double calories;
        private Double protein;
        private Double carbs;
        private Double fat;
        private List<String> ingredients;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class WorkoutRecommendation {
        private String title;
        private String duration;
        private String intensity;
        private List<String> exercises;
    }
}
