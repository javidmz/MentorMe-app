package com.chatapp.ChatApp.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyDTO {
    private int id;
    private int rank;
    private String replyContent;
    private UserDTO fromUser;
    private UserDTO targetUser;
}
