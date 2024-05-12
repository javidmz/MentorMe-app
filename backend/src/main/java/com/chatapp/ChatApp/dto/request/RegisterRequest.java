package com.chatapp.ChatApp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "You should provide first name")
    @Pattern(regexp = "^[A-Za-z]+$", message = "First Name should contain only letters.")
    private String firstName;
    @NotBlank(message = "You should provide last name")
    @Pattern(regexp = "^[A-Za-z]+$", message = "Last Name should contain only letters.")
    private String lastName;
    @NotBlank(message = "You should provide username")
    @Pattern(regexp = "^[A-z][A-z0-9-_]{3,23}$",
            message = "Username should contain 4 to 24 characters. " +
                    "Must begin with a letter. " +
                    "Letters, numbers, underscores, hyphens allowed.")
    private String username;
    @NotBlank(message = "You should provide password")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])[a-zA-Z0-9!@#$%]{8,24}$",
            message = "Password should contain 8 to 24 characters. " +
                    "Must include uppercase and lowercase letters, a number and a special character. " +
                    "Allowed special characters: ! @ # $ %")
    private String password;
}
