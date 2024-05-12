package com.chatapp.ChatApp.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {
    private int id;
    private String commentContent;
    private int rank;
    private UserDTO commenter;
    private int chatId;
    private List<ReplyDTO> replies;
}
