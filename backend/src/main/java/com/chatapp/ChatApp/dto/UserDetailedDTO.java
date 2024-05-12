package com.chatapp.ChatApp.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDetailedDTO {
    private UserDTO userDTO;
    private int totalNumberOfChatsByUser;
    private int totalNumberOfCommentsByUser;
    private int totalNumberOfRepliesByUser;
}
