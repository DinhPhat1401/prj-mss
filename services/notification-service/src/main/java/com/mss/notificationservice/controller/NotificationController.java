package com.mss.notificationservice.controller;

import com.mss.notificationservice.dto.PushNotificationRequest;
import com.mss.notificationservice.service.FcmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final FcmService fcmService;

    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody PushNotificationRequest request) {
        fcmService.sendPushNotification(request);
        return ResponseEntity.ok("Notification sent successfully");
    }
}
