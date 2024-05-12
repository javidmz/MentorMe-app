package com.chatapp.ChatApp.controller;

import com.chatapp.ChatApp.config.JwtService;
import com.chatapp.ChatApp.dto.response.AccessTokenResponse;
import com.chatapp.ChatApp.dto.request.AuthenticationRequest;
import com.chatapp.ChatApp.dto.response.AuthenticationResponse;
import com.chatapp.ChatApp.dto.request.RegisterRequest;
import com.chatapp.ChatApp.entity.RefreshToken;
import com.chatapp.ChatApp.service.AuthenticationService;
import com.chatapp.ChatApp.service.RefreshTokenService;
import com.chatapp.ChatApp.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        AuthenticationResponse authResponse = authenticationService.register(request);
        RefreshToken refreshToken = refreshTokenService.generateRefreshToken(userService.findByUsername(request.getUsername()));
        ResponseCookie cookie = jwtService.generateRefreshJwtCookie("jwt-refresh", refreshToken.getToken(), "/");
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        AuthenticationResponse authResponse = authenticationService.authenticate(request);
        RefreshToken refreshToken = refreshTokenService.generateRefreshToken(userService.findByUsername(request.getUsername()));
        ResponseCookie cookie = jwtService.generateRefreshJwtCookie("jwt-refresh", refreshToken.getToken(), "/");
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(authResponse);
    }

    @PostMapping("/remember-me")
    public ResponseEntity<AuthenticationResponse> rememberMeToken(HttpServletRequest request) throws IOException {
        return ResponseEntity.ok(authenticationService.rememberMe(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AccessTokenResponse> refreshToken(HttpServletRequest request) throws IOException {
        return ResponseEntity.ok(authenticationService.refreshToken(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        authenticationService.logout(request);
        ResponseCookie cookie = jwtService.getCleanRefreshJwtCookie("jwt-refresh", "/");
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("You've been logged out successfully.");
    }
}
