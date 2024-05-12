package com.chatapp.ChatApp.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentOverviewListDTO {
    private List<CommentOverviewDTO> commentOverviewDTOList;
    private int totalRecords;
}