package com.mss.blacklistservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MealPlanValidationResponse {
    private boolean valid;
    private int totalViolations;
    private List<ViolationDetail> violations;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ViolationDetail {
        private String mealName;
        private String matchedBlacklistItem;
        private String reason;
    }
}
