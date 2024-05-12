package com.chatapp.ChatApp.service;

import com.chatapp.ChatApp.dto.response.AccessTokenResponse;
import com.chatapp.ChatApp.dto.request.AuthenticationRequest;
import com.chatapp.ChatApp.dto.response.AuthenticationResponse;
import com.chatapp.ChatApp.dto.request.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

public interface AuthenticationService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse authenticate(AuthenticationRequest request);

    AuthenticationResponse rememberMe(HttpServletRequest request) throws IOException;

    AccessTokenResponse refreshToken(HttpServletRequest request) throws IOException;

    void logout(HttpServletRequest request);
}
