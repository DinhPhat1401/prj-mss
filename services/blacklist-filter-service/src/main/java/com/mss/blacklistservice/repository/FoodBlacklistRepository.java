package com.mss.blacklistservice.repository;

import com.mss.blacklistservice.model.FoodBlacklist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FoodBlacklistRepository extends JpaRepository<FoodBlacklist, UUID> {
    List<FoodBlacklist> findByUserId(UUID userId);
    void deleteByUserIdAndFoodNameIgnoreCase(UUID userId, String foodName);
}
