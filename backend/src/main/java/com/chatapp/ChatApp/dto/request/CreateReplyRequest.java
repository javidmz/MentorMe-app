package com.chatapp.ChatApp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateReplyRequest {
    @NotBlank(message = "Comment should not be empty")
    @Size(max = 250, message = "Comment should not be more than 250 characters")
    private String replyContent;
    private int fromUserId;
    private int targetUserId;
    private int commentId;
}