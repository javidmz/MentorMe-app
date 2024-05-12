package com.chatapp.ChatApp.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateReplyRequest {
    private String replyContent;
}
