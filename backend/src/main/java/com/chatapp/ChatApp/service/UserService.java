package com.chatapp.ChatApp.service;

import com.chatapp.ChatApp.dto.*;
import com.chatapp.ChatApp.entity.Reply;
import com.chatapp.ChatApp.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    User getUserById(int theId);

    User saveUser(User newUser);

    UserDTO updateUser(UserDTO theUser);

    User findByUsername(String email);

    void deleteUser(int userId);

    boolean isUserExists(String username);

}