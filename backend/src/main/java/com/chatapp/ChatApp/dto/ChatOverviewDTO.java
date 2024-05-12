package com.chatapp.ChatApp.dto;

import com.chatapp.ChatApp.entity.Tag;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatOverviewDTO {
    private int id;
    private String title;
    private String description;
    private int rank;
    private List<Tag> tags;
}
