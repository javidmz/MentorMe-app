package com.chatapp.ChatApp.service.Impl;

import com.chatapp.ChatApp.dto.*;
import com.chatapp.ChatApp.entity.User;
import com.chatapp.ChatApp.exception.NotFoundException;
import com.chatapp.ChatApp.exception.NotUniqueException;
import com.chatapp.ChatApp.mapper.UserMapper;
import com.chatapp.ChatApp.repository.UserRepository;
import com.chatapp.ChatApp.service.UserService;
import com.chatapp.ChatApp.validator.InputValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final InputValidation<UserDTO> userDTOInputValidation;

    @Override
    public User getUserById(int theId) {
        return userRepository.findById(theId)
                .orElseThrow(() -> new NotFoundException("User does not exist"));
    }

    @Override
    public User saveUser(User newUser) {
        return userRepository.save(newUser);
    }

    @Override
    public UserDTO updateUser(UserDTO theUser) {
        User user = getUserById(theUser.getId());

        userDTOInputValidation.validate(theUser);
        if(findByUsername(theUser.getUsername()) != null)
            throw new NotUniqueException("This username already taken.");

        user.setFirstName(theUser.getFirstName());
        user.setLastName(theUser.getLastName());
        user.setUsername(theUser.getUsername());
        return userMapper.userToUserDTO(user);
    }

    @Override
    public User findByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));
        return user;
    }

    @Override
    public void deleteUser(int userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public boolean isUserExists(String username) {
        if(userRepository.findByUsername(username).isEmpty())
            return false;
        return true;
    }
}
