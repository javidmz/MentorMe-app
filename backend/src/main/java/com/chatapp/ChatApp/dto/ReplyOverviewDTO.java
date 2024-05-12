package com.chatapp.ChatApp.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyOverviewDTO {
    private int id;
    private String replyContent;
    private int rank;
    private String repliedUsername;
    private int chatId;
    private String chatTitle;
}
