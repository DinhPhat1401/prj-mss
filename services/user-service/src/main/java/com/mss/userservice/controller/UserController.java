package com.mss.userservice.controller;

import com.mss.userservice.dto.UserProfileRequest;
import com.mss.userservice.dto.UserProfileResponse;
import com.mss.userservice.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/profile")
    public ResponseEntity<UserProfileResponse> createOrUpdateProfile(@Valid @RequestBody UserProfileRequest request) {
        return ResponseEntity.ok(userService.createOrUpdateProfile(request));
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<UserProfileResponse> getProfile(@PathVariable UUID userId) {
        return ResponseEntity.ok(userService.getProfile(userId));
    }
}
