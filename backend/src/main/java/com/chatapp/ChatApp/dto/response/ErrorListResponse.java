package com.chatapp.ChatApp.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorListResponse {
    private List<String> message;
    private LocalDateTime timeStamp;
}
