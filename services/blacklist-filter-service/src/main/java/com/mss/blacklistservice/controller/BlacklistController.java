package com.mss.blacklistservice.controller;

import com.mss.blacklistservice.model.FoodAllergy;
import com.mss.blacklistservice.model.FoodBlacklist;
import com.mss.blacklistservice.service.BlacklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/blacklist")
@RequiredArgsConstructor
public class BlacklistController {

    private final BlacklistService blacklistService;
    private final com.mss.blacklistservice.service.FoodReplacementService foodReplacementService;

    @PostMapping("/{userId}")
    public ResponseEntity<FoodBlacklist> addBlacklist(
            @PathVariable UUID userId,
            @RequestParam String foodName,
            @RequestParam(required = false) String reason) {
        return ResponseEntity.ok(blacklistService.addBlacklist(userId, foodName, reason));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<String>> getUserBlacklist(@PathVariable UUID userId) {
        return ResponseEntity.ok(blacklistService.getUserBlacklist(userId));
    }

    @PostMapping("/{userId}/allergy")
    public ResponseEntity<FoodAllergy> addAllergy(
            @PathVariable UUID userId,
            @RequestParam String allergen,
            @RequestParam(defaultValue = "HIGH") FoodAllergy.Severity severity) {
        return ResponseEntity.ok(blacklistService.addAllergy(userId, allergen, severity));
    }

    @GetMapping("/{userId}/allergy")
    public ResponseEntity<List<FoodAllergy>> getUserAllergies(@PathVariable UUID userId) {
        return ResponseEntity.ok(blacklistService.getUserAllergies(userId));
    }

    @PostMapping("/validate-meal-plan")
    public ResponseEntity<com.mss.blacklistservice.dto.MealPlanValidationResponse> validateMealPlan(
            @RequestBody com.mss.blacklistservice.dto.MealPlanValidationRequest request) {
        return ResponseEntity.ok(blacklistService.validateMealPlan(request));
    }

    @PostMapping("/replace-food")
    public ResponseEntity<com.mss.blacklistservice.service.FoodReplacementService.FoodMacro> replaceFood(
            @RequestBody com.mss.blacklistservice.service.FoodReplacementService.FoodMacro originalFood,
            @RequestParam UUID userId) {
        List<String> blacklist = blacklistService.getUserBlacklist(userId);
        return ResponseEntity.ok(foodReplacementService.findBestReplacement(originalFood, blacklist));
    }
}
