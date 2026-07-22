package com.mss.userservice.dto;

import com.mss.userservice.model.UserProfile.ActivityLevel;
import com.mss.userservice.model.UserProfile.FitnessGoal;
import com.mss.userservice.model.UserProfile.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponse {
    private UUID userId;
    private Integer age;
    private Gender gender;
    private Double heightCm;
    private Double weightKg;
    private FitnessGoal fitnessGoal;
    private ActivityLevel activityLevel;
    private Double bmr;
    private Double tdee;
    private Double targetCalories;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
