package com.chatapp.ChatApp.dto.response;

import com.chatapp.ChatApp.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagResponse {
    private List<Tag> tags;
}
