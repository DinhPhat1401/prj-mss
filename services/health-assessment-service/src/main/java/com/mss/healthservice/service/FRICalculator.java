package com.mss.healthservice.service;

import com.mss.healthservice.dto.FRIResult;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class FRICalculator {

    private static final double W1_RHR = 0.5;
    private static final double W2_SLEEP = 0.5;
    private static final double SLEEP_RECOMMENDED = 8.0;

    public FRIResult calculateFRI(UUID userId, double currentRHR, double baseRHR, double sleepHours) {
        double rhrDelta = currentRHR - baseRHR;
        double rhrRatio = baseRHR > 0 ? (rhrDelta / baseRHR) : 0;
        double sleepDeficitRatio = 1.0 - (sleepHours / SLEEP_RECOMMENDED);

        // Normalize penalty: lower score means higher fatigue
        double fatiguePenalty = (W1_RHR * Math.max(0, rhrRatio)) + (W2_SLEEP * Math.max(0, sleepDeficitRatio));
        double friScore = Math.max(0, Math.min(100, Math.round((1.0 - fatiguePenalty) * 100.0)));

        String status;
        double alphaIntensity;
        String reason;

        if (friScore < 50) {
            status = "FATIGUE";
            alphaIntensity = 0.6; // Reduce intensity by 40%
            reason = "Nhịp tim nghỉ tăng cao và thiếu ngủ. Đề xuất bài tập nhẹ nhàng (Yoga/Stretching) và bữa ăn giàu magie, phục hồi.";
        } else if (friScore >= 80) {
            status = "PEAK_RECOVERY";
            alphaIntensity = 1.2; // Increase intensity by 20%
            reason = "Cơ thể ở trạng thái phục hồi đỉnh cao. Sẵn sàng cho bài tập HIIT / Kháng lực cường độ cao!";
        } else {
            status = "NORMAL";
            alphaIntensity = 1.0;
            reason = "Chỉ số sức khỏe cân bằng. Duy trì thực đơn và bài tập tiêu chuẩn.";
        }

        return FRIResult.builder()
                .userId(userId)
                .friScore(friScore)
                .status(status)
                .alphaIntensity(alphaIntensity)
                .currentRHR(currentRHR)
                .baseRHR(baseRHR)
                .sleepHours(sleepHours)
                .recommendationReason(reason)
                .calculatedAt(LocalDateTime.now())
                .build();
    }
}
