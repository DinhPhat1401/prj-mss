package com.mss.blacklistservice.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class FoodReplacementService {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class FoodMacro {
        private String name;
        private double protein;
        private double carbs;
        private double fat;
    }

    private final List<FoodMacro> foodDatabase = List.of(
            new FoodMacro("Ức gà áp chảo", 31.0, 0.0, 3.6),
            new FoodMacro("Thịt lợn nạc", 27.0, 0.0, 4.0),
            new FoodMacro("Tôm hấp", 24.0, 0.2, 0.3),
            new FoodMacro("Đậu phụ rán nhẹ", 17.0, 3.0, 9.0),
            new FoodMacro("Cá hồi nướng", 22.0, 0.0, 13.0),
            new FoodMacro("Gạo lứt chín", 2.6, 23.0, 0.9),
            new FoodMacro("Khoai lang luộc", 1.6, 20.0, 0.1),
            new FoodMacro("Yến mạch", 13.0, 68.0, 6.0)
    );

    public FoodMacro findBestReplacement(FoodMacro originalFood, List<String> blacklist) {
        List<String> blacklistLower = blacklist.stream().map(String::toLowerCase).toList();

        return foodDatabase.stream()
                .filter(food -> !food.getName().equalsIgnoreCase(originalFood.getName()))
                .filter(food -> blacklistLower.stream().noneMatch(b -> food.getName().toLowerCase().contains(b)))
                .min(Comparator.comparingDouble(candidate -> calculateMacroLoss(originalFood, candidate)))
                .orElse(foodDatabase.get(0));
    }

    private double calculateMacroLoss(FoodMacro original, FoodMacro candidate) {
        double wP = 1.5; // Protein weight multiplier
        double wC = 1.0;
        double wF = 1.0;

        return wP * Math.pow(original.getProtein() - candidate.getProtein(), 2)
             + wC * Math.pow(original.getCarbs() - candidate.getCarbs(), 2)
             + wF * Math.pow(original.getFat() - candidate.getFat(), 2);
    }
}
