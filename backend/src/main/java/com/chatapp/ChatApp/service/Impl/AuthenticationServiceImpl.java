package com.chatapp.ChatApp.service.Impl;

import com.chatapp.ChatApp.config.JwtService;
import com.chatapp.ChatApp.dto.response.AccessTokenResponse;
import com.chatapp.ChatApp.dto.request.AuthenticationRequest;
import com.chatapp.ChatApp.dto.response.AuthenticationResponse;
import com.chatapp.ChatApp.dto.request.RegisterRequest;
import com.chatapp.ChatApp.entity.RefreshToken;
import com.chatapp.ChatApp.entity.User;
import com.chatapp.ChatApp.enums.Role;
import com.chatapp.ChatApp.exception.InvalidRefreshTokenException;
import com.chatapp.ChatApp.exception.NotUniqueException;
import com.chatapp.ChatApp.service.AuthenticationService;
import com.chatapp.ChatApp.service.RefreshTokenService;
import com.chatapp.ChatApp.service.UserService;
import com.chatapp.ChatApp.validator.InputValidation;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final InputValidation<RegisterRequest> registerRequestInputValidation;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        registerRequestInputValidation.validate(request);

        if(userService.isUserExists(request.getUsername()))
            throw new NotUniqueException("This username already taken.");

        User newUser = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        User savedUser = userService.saveUser(newUser);
        String jwtToken = jwtService.generateToken(newUser);
        return AuthenticationResponse.builder()
                .id(savedUser.getId())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .username(savedUser.getUsername())
                .role(Role.USER)
                .accessToken(jwtToken)
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        User user = userService.findByUsername(request.getUsername());
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(request.getUsername())
                .role(Role.USER)
                .accessToken(jwtToken)
                .build();
    }

    @Override
    public AuthenticationResponse rememberMe(HttpServletRequest request) {
        AccessTokenResponse accessTokenResponse = refreshToken(request);
        String username = jwtService.extractUsername(accessTokenResponse.getAccessToken());
        User user = userService.findByUsername(username);

        return AuthenticationResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .role(user.getRole())
                .accessToken(accessTokenResponse.getAccessToken())
                .build();
    }

    @Override
    public AccessTokenResponse refreshToken(HttpServletRequest request) {
        String refreshTokenByCookie = null;
        AccessTokenResponse accessTokenResponse = null;
        Cookie[] cookies = request.getCookies();

        try {
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("jwt-refresh".equals(cookie.getName())) {
                        refreshTokenByCookie = cookie.getValue();
                    }
                }
            }
            else
                return null;

            String userEmail = jwtService.extractUsername(refreshTokenByCookie);
            if(userEmail != null) {
                User theUser = userService.findByUsername(userEmail);
                RefreshToken refreshToken = refreshTokenService.findByToken(refreshTokenByCookie);
                if(jwtService.isTokenValid(refreshTokenByCookie, theUser) && !refreshToken.isRevoked()) {
                    String accessToken = jwtService.generateToken(theUser);
                    accessTokenResponse = AccessTokenResponse.builder()
                            .accessToken(accessToken)
                            .build();
                }
            }
        } catch (Exception exp) {
            throw new InvalidRefreshTokenException("You should login again!");
        }

        return accessTokenResponse;
    }

    @Override
    public void logout(HttpServletRequest request) {
        SecurityContextHolder.clearContext();
        String refreshTokenByCookie = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt-refresh".equals(cookie.getName())) {
                    refreshTokenByCookie = cookie.getValue();
                }
            }
        }
        else
            return;

        RefreshToken refreshToken = refreshTokenService.findByToken(refreshTokenByCookie);
        refreshToken.setRevoked(true);
        refreshTokenService.save(refreshToken);
    }
}
