package com.mss.userservice.dto;

import com.mss.userservice.model.UserProfile.ActivityLevel;
import com.mss.userservice.model.UserProfile.FitnessGoal;
import com.mss.userservice.model.UserProfile.Gender;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class UserProfileRequest {
    @NotNull(message = "User ID is required")
    private UUID userId;

    @NotNull(message = "Age is required")
    @Min(value = 10, message = "Age must be at least 10")
    private Integer age;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @NotNull(message = "Height is required")
    @Min(value = 50, message = "Height must be at least 50 cm")
    private Double heightCm;

    @NotNull(message = "Weight is required")
    @Min(value = 20, message = "Weight must be at least 20 kg")
    private Double weightKg;

    @NotNull(message = "Fitness goal is required")
    private FitnessGoal fitnessGoal;

    @NotNull(message = "Activity level is required")
    private ActivityLevel activityLevel;
}
