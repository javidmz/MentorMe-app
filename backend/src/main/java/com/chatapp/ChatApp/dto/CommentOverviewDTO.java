package com.chatapp.ChatApp.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentOverviewDTO {
    private int id;
    private String commentContent;
    private int chatId;
    private String chatTitle;
    private int rank;
}
