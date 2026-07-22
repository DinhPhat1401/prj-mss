package com.mss.notificationservice.service;

import com.mss.notificationservice.dto.PushNotificationRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class FcmService {

    public void sendPushNotification(PushNotificationRequest request) {
        log.info("Sending FCM Push Notification to device token: {}, Title: '{}', Body: '{}'",
                request.getToken(), request.getTitle(), request.getBody());
    }
}
