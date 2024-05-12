package com.chatapp.ChatApp.dto;

import com.chatapp.ChatApp.entity.Tag;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatDTO {
    private int id;
    private int rank;
    private String title;
    private LocalDateTime chatCreationDate;
    private String description;
    private UserDTO chatCreator;
    private List<CommentDTO> comments;
    private List<Tag> tags;
}
