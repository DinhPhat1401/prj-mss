package com.mss.blacklistservice.service;

import com.mss.blacklistservice.model.FoodAllergy;
import com.mss.blacklistservice.model.FoodBlacklist;
import com.mss.blacklistservice.repository.FoodAllergyRepository;
import com.mss.blacklistservice.repository.FoodBlacklistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlacklistService {

    private final FoodBlacklistRepository blacklistRepository;
    private final FoodAllergyRepository allergyRepository;
    private final StringRedisTemplate redisTemplate;

    public FoodBlacklist addBlacklist(UUID userId, String foodName, String reason) {
        FoodBlacklist blacklist = FoodBlacklist.builder()
                .userId(userId)
                .foodName(foodName.trim().toLowerCase())
                .reason(reason)
                .build();
        FoodBlacklist saved = blacklistRepository.save(blacklist);
        evictCache(userId);
        return saved;
    }

    public List<String> getUserBlacklist(UUID userId) {
        String cacheKey = "BL:" + userId;
        String cached = redisTemplate.opsForValue().get(cacheKey);

        if (cached != null) {
            return List.of(cached.split(","));
        }

        List<FoodBlacklist> list = blacklistRepository.findByUserId(userId);
        List<String> names = list.stream().map(FoodBlacklist::getFoodName).collect(Collectors.toList());

        if (!names.isEmpty()) {
            redisTemplate.opsForValue().set(cacheKey, String.join(",", names), 30, TimeUnit.MINUTES);
        }
        return names;
    }

    public FoodAllergy addAllergy(UUID userId, String allergen, FoodAllergy.Severity severity) {
        FoodAllergy allergy = FoodAllergy.builder()
                .userId(userId)
                .allergen(allergen.trim().toUpperCase())
                .severity(severity)
                .build();
        return allergyRepository.save(allergy);
    }

    public List<FoodAllergy> getUserAllergies(UUID userId) {
        return allergyRepository.findByUserId(userId);
    }

    public com.mss.blacklistservice.dto.MealPlanValidationResponse validateMealPlan(com.mss.blacklistservice.dto.MealPlanValidationRequest request) {
        List<String> blacklist = getUserBlacklist(request.getUserId());
        List<FoodAllergy> allergies = getUserAllergies(request.getUserId());
        List<String> allergenNames = allergies.stream().map(a -> a.getAllergen().toLowerCase()).toList();

        List<com.mss.blacklistservice.dto.MealPlanValidationResponse.ViolationDetail> violations = new java.util.ArrayList<>();

        if (request.getItems() != null) {
            for (var item : request.getItems()) {
                String nameLower = item.getMealName().toLowerCase();
                List<String> ingredientsLower = item.getIngredients() != null ?
                        item.getIngredients().stream().map(String::toLowerCase).toList() : List.of();

                for (String blocked : blacklist) {
                    if (nameLower.contains(blocked) || ingredientsLower.stream().anyMatch(ing -> ing.contains(blocked))) {
                        violations.add(new com.mss.blacklistservice.dto.MealPlanValidationResponse.ViolationDetail(
                                item.getMealName(), blocked, "Trùng thực phẩm trong Blacklist cá nhân"));
                    }
                }

                for (String allergen : allergenNames) {
                    if (nameLower.contains(allergen) || ingredientsLower.stream().anyMatch(ing -> ing.contains(allergen))) {
                        violations.add(new com.mss.blacklistservice.dto.MealPlanValidationResponse.ViolationDetail(
                                item.getMealName(), allergen, "Chứa chất gây dị ứng nguy hiểm!"));
                    }
                }
            }
        }

        return com.mss.blacklistservice.dto.MealPlanValidationResponse.builder()
                .valid(violations.isEmpty())
                .totalViolations(violations.size())
                .violations(violations)
                .build();
    }

    private void evictCache(UUID userId) {
        redisTemplate.delete("BL:" + userId);
    }
}
