package com.chatapp.ChatApp.mapper;

import com.chatapp.ChatApp.dto.UserDTO;
import com.chatapp.ChatApp.entity.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO userToUserDTO(User user);
}
