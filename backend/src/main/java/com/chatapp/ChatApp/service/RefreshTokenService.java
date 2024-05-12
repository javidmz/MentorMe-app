package com.chatapp.ChatApp.service;

import com.chatapp.ChatApp.entity.RefreshToken;
import com.chatapp.ChatApp.entity.User;

import java.util.List;
import java.util.Optional;

public interface RefreshTokenService {

    RefreshToken save(RefreshToken token);

    RefreshToken findByToken(String token);

    RefreshToken generateRefreshToken(User user);
}
