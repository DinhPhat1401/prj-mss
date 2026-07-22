package com.mss.healthservice.repository;

import com.mss.healthservice.model.HealthAssessmentRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface HealthAssessmentRepository extends JpaRepository<HealthAssessmentRecord, UUID> {
    List<HealthAssessmentRecord> findByUserIdOrderByCalculatedAtDesc(UUID userId);
}
