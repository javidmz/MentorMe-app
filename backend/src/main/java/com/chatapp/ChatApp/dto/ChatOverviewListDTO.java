package com.chatapp.ChatApp.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatOverviewListDTO {
    private List<ChatOverviewDTO> chatOverviewDTOList;
    private int totalRecords;
}
