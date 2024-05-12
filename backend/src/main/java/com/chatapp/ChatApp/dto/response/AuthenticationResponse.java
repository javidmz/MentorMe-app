package com.chatapp.ChatApp.dto.response;

import com.chatapp.ChatApp.enums.Role;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    private int id;
    private String firstName;
    private String lastName;
    private String username;
    private Role role;
    private String accessToken;
}
