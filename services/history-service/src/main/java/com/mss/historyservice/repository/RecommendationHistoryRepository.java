package com.mss.historyservice.repository;

import com.mss.historyservice.model.RecommendationHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RecommendationHistoryRepository extends JpaRepository<RecommendationHistory, UUID> {
    List<RecommendationHistory> findByUserIdOrderByCreatedAtDesc(UUID userId);
}
