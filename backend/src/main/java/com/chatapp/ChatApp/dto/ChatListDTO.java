package com.chatapp.ChatApp.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatListDTO {
    private List<ChatDTO> chatList;
    private int totalRecords;
}
