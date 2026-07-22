package com.mss.blacklistservice.dto;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class MealPlanValidationRequest {
    private UUID userId;
    private List<MealItem> items;

    @Data
    public static class MealItem {
        private String mealName;
        private List<String> ingredients;
    }
}
