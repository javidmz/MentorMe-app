package com.chatapp.ChatApp.service.Impl;

import com.chatapp.ChatApp.config.JwtService;
import com.chatapp.ChatApp.entity.RefreshToken;
import com.chatapp.ChatApp.entity.User;
import com.chatapp.ChatApp.repository.RefreshTokenRepository;
import com.chatapp.ChatApp.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository tokenRepository;
    private final JwtService jwtService;

    @Override
    public RefreshToken save(RefreshToken token) {
        return tokenRepository.save(token);
    }

    @Override
    public RefreshToken findByToken(String token) {
        return tokenRepository.findByToken(token).
                orElseThrow(() -> new RuntimeException("Error happened!"));
    }

    @Override
    public RefreshToken generateRefreshToken(User user) {
        return save(RefreshToken.builder()
                .token(jwtService.generateRefreshToken(user))
                .revoked(false)
                .user(user)
                .build());
    }
}
