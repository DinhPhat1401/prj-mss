package com.mss.recommendationservice.service;

import com.mss.recommendationservice.dto.RecommendationRequest;
import org.springframework.stereotype.Service;

@Service
public class PromptBuilder {

    public String buildPrompt(RecommendationRequest request) {
        String blacklistStr = (request.getBlacklist() != null && !request.getBlacklist().isEmpty()) ?
                String.join(", ", request.getBlacklist()) : "Không có";

        return String.format("""
            Bạn là Chuyên gia Dinh dưỡng & Huấn luyện viên Thể hình AI.
            Hãy tạo thực đơn 3 bữa (Sáng, Trưa, Tối) và bài tập hôm nay cho người dùng dựa trên thông số sau:
            - Mục tiêu Calo hàng ngày: %.0f kcal
            - Mục tiêu thể hình: %s
            - Chỉ số mệt mỏi FRI: %.0f/100 (Trạng thái: %s, Hệ số Cường độ Alpha = %.2f)
            - Thực phẩm CẤM / Dị ứng (Blacklist): %s (TUYỆT ĐỐI KHÔNG CHỨA CÁC MÓN NÀY)

            YÊU CẦU: Trả về kết quả hoàn toàn bằng cấu trúc JSON không chứa bất kỳ giải thích nào bên ngoài.
            """,
                request.getTargetCalories() != null ? request.getTargetCalories() : 2000.0,
                request.getFitnessGoal() != null ? request.getFitnessGoal() : "MAINTAIN_WEIGHT",
                request.getFriScore() != null ? request.getFriScore() : 80.0,
                request.getHealthStatus() != null ? request.getHealthStatus() : "NORMAL",
                request.getAlphaIntensity() != null ? request.getAlphaIntensity() : 1.0,
                blacklistStr
        );
    }
}
