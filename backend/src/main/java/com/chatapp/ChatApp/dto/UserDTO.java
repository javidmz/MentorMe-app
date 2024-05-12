package com.chatapp.ChatApp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private int id;
    @NotBlank(message = "You should provide first name")
    @Pattern(regexp = "^[A-Za-z]+$")
    private String firstName;
    @NotBlank(message = "You should provide last name")
    @Pattern(regexp = "^[A-Za-z]+$")
    private String lastName;
    @NotBlank(message = "You should provide username")
    @Pattern(regexp = "^[A-z][A-z0-9-_]{3,23}$")
    private String username;
}
