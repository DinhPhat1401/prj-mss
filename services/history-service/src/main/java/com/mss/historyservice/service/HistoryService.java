package com.mss.historyservice.service;

import com.mss.historyservice.model.RecommendationHistory;
import com.mss.historyservice.repository.RecommendationHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final RecommendationHistoryRepository historyRepository;

    public RecommendationHistory saveHistory(RecommendationHistory history) {
        return historyRepository.save(history);
    }

    public List<RecommendationHistory> getUserHistory(UUID userId) {
        return historyRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}
