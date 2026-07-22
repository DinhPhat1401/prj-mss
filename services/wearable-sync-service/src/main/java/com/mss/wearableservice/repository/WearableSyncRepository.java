package com.mss.wearableservice.repository;

import com.mss.wearableservice.model.WearableSyncRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WearableSyncRepository extends JpaRepository<WearableSyncRecord, UUID> {
    List<WearableSyncRecord> findByUserIdOrderBySyncedAtDesc(UUID userId);
}
