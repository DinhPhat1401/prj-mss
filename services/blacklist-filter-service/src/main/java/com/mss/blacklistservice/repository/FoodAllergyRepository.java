package com.mss.blacklistservice.repository;

import com.mss.blacklistservice.model.FoodAllergy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FoodAllergyRepository extends JpaRepository<FoodAllergy, UUID> {
    List<FoodAllergy> findByUserId(UUID userId);
}
