package com.chatapp.ChatApp.advice;

import com.chatapp.ChatApp.config.JwtService;
import com.chatapp.ChatApp.dto.response.ErrorListResponse;
import com.chatapp.ChatApp.dto.response.ErrorResponse;
import com.chatapp.ChatApp.exception.*;
import io.jsonwebtoken.JwtException;
import jakarta.security.auth.message.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalRestControllerAdvice {
    private final JwtService jwtService;

    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<?> handleException(Exception exp) {
        String errorMessage = "Internal Server Error";
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        if (exp instanceof IncorrectInputException) {
            return ResponseEntity.badRequest().body(ErrorListResponse.builder()
                    .message(((IncorrectInputException) exp).getErrorMessages())
                    .timeStamp(LocalDateTime.now())
                    .build());
        } else if (exp instanceof NotEnoughTagException ||
                exp instanceof NotUniqueException ||
                exp instanceof NotFoundException
        ) {
            errorMessage = exp.getMessage();
            status = HttpStatus.BAD_REQUEST;
        } else if (exp instanceof InvalidRefreshTokenException) {
            ResponseCookie cookie = jwtService.getCleanRefreshJwtCookie("jwt-refresh", "/");

            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(ErrorResponse.builder()
                    .message(exp.getMessage())
                    .timeStamp(LocalDateTime.now())
                    .build());
        }
        else if (exp instanceof BadCredentialsException) {
            errorMessage = "Please, recheck username or password.";
            status = HttpStatus.UNAUTHORIZED;
        }  else if (exp instanceof JwtException) {
            errorMessage = "Invalid Token is sent";
            status = HttpStatus.FORBIDDEN;
        } else if (exp instanceof AccessDeniedException) {
            errorMessage = "Access denied.";
            status = HttpStatus.UNAUTHORIZED;
        } else if (exp instanceof AuthException) {
            errorMessage = "You should log in.";
            status = HttpStatus.UNAUTHORIZED;
        }

        return ResponseEntity.status(status).body(ErrorResponse.builder()
                .message(errorMessage)
                .timeStamp(LocalDateTime.now())
                .build());
    }
}
