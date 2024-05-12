package com.chatapp.ChatApp.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ReplyOverviewListDTO {
    private List<ReplyOverviewDTO> replyOverviewDTOList;
    private int totalRecords;
}
