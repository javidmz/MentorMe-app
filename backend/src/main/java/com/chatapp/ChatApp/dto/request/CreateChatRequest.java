package com.chatapp.ChatApp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CreateChatRequest {
    @NotBlank(message = "Title should not be empty")
    @Size(max = 50, message = "Title should not be more than 50 characters")
    private String title;
    @NotBlank(message = "Description should not be empty")
    @Size(max = 250, message = "Description should not be more than 250 characters")
    private String description;
    private int userId;
    @NotEmpty(message = "Please, select at least 1 tag")
    @Size(max = 5, message = "User cannot select more than 5 tags")
    private List<Integer> tagIdList;
}
