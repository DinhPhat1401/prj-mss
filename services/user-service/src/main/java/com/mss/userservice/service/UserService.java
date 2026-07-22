package com.mss.userservice.service;

import com.mss.userservice.dto.UserProfileRequest;
import com.mss.userservice.dto.UserProfileResponse;
import com.mss.userservice.model.UserProfile;
import com.mss.userservice.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserProfileRepository userProfileRepository;

    public UserProfileResponse createOrUpdateProfile(UserProfileRequest request) {
        double bmr = calculateBMR(request.getGender(), request.getWeightKg(), request.getHeightCm(), request.getAge());
        double tdee = bmr * request.getActivityLevel().getMultiplier();
        double targetCalories = calculateTargetCalories(tdee, request.getFitnessGoal());

        UserProfile profile = userProfileRepository.findById(request.getUserId())
                .orElse(UserProfile.builder().userId(request.getUserId()).build());

        profile.setAge(request.getAge());
        profile.setGender(request.getGender());
        profile.setHeightCm(request.getHeightCm());
        profile.setWeightKg(request.getWeightKg());
        profile.setFitnessGoal(request.getFitnessGoal());
        profile.setActivityLevel(request.getActivityLevel());
        profile.setBmr(roundTwoDecimals(bmr));
        profile.setTdee(roundTwoDecimals(tdee));
        profile.setTargetCalories(roundTwoDecimals(targetCalories));

        UserProfile saved = userProfileRepository.save(profile);
        return mapToResponse(saved);
    }

    public UserProfileResponse getProfile(UUID userId) {
        UserProfile profile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User profile not found for id: " + userId));
        return mapToResponse(profile);
    }

    private double calculateBMR(UserProfile.Gender gender, double weightKg, double heightCm, int age) {
        // Mifflin-St Jeor Equation
        if (gender == UserProfile.Gender.MALE) {
            return (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
        } else {
            return (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
        }
    }

    private double calculateTargetCalories(double tdee, UserProfile.FitnessGoal goal) {
        return switch (goal) {
            case LOSE_WEIGHT -> tdee - 500; // Calorie deficit
            case GAIN_MUSCLE -> tdee + 300; // Calorie surplus
            case MAINTAIN_WEIGHT -> tdee;
        };
    }

    private double roundTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    private UserProfileResponse mapToResponse(UserProfile profile) {
        return UserProfileResponse.builder()
                .userId(profile.getUserId())
                .age(profile.getAge())
                .gender(profile.getGender())
                .heightCm(profile.getHeightCm())
                .weightKg(profile.getWeightKg())
                .fitnessGoal(profile.getFitnessGoal())
                .activityLevel(profile.getActivityLevel())
                .bmr(profile.getBmr())
                .tdee(profile.getTdee())
                .targetCalories(profile.getTargetCalories())
                .createdAt(profile.getCreatedAt())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }
}
