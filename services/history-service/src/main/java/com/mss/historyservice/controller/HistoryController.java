package com.mss.historyservice.controller;

import com.mss.historyservice.model.RecommendationHistory;
import com.mss.historyservice.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;

    @PostMapping
    public ResponseEntity<RecommendationHistory> saveHistory(@RequestBody RecommendationHistory history) {
        return ResponseEntity.ok(historyService.saveHistory(history));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<RecommendationHistory>> getUserHistory(@PathVariable UUID userId) {
        return ResponseEntity.ok(historyService.getUserHistory(userId));
    }
}
