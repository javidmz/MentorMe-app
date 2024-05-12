package com.chatapp.ChatApp.controller;

import com.chatapp.ChatApp.dto.*;
import com.chatapp.ChatApp.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;
    private final ChatService chatService;
    private final CommentService commentService;
    private final ReplyService replyService;
    private final UserDeletionService userDeletionService;

    @GetMapping("/user/{userId}/chats")
    public ResponseEntity<ChatOverviewListDTO> getChatsByUserId(
            @PathVariable int userId,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") Sort.Direction direction,
            @RequestParam(defaultValue = "All") String tag,
            @RequestParam(defaultValue = "") String search
    ) {
        return ResponseEntity.ok(chatService.findAllChatsCreatedByUser(
                userId,
                pageNo,
                pageSize,
                sortBy,
                direction,
                tag,
                search
        ));
    }

    @GetMapping("/user/{userId}/comments")
    public ResponseEntity<CommentOverviewListDTO> getCommentsByUserId(
            @PathVariable int userId,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") Sort.Direction direction,
            @RequestParam(defaultValue = "") String search
    ) {
        return ResponseEntity.ok(commentService.findAllCommentsCreatedByUser(
                userId,
                pageNo,
                pageSize,
                sortBy,
                direction,
                search
        ));
    }

    @GetMapping("/user/{userId}/replies")
    public ResponseEntity<ReplyOverviewListDTO> getRepliesByUserId(
            @PathVariable int userId,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") Sort.Direction direction,
            @RequestParam(defaultValue = "") String search
    ) {
        return ResponseEntity.ok(replyService.findAllRepliesByUserIdAndSearch(
                userId,
                pageNo,
                pageSize,
                sortBy,
                direction,
                search
        ));
    }

    @PutMapping("/user/{userId}")
    public ResponseEntity<UserDTO> updateUserDetails(@PathVariable int userId, @RequestBody UserDTO updatedUser) {
        return ResponseEntity.ok(userService.updateUser(updatedUser));
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<String> deleteUserDetails(@PathVariable int userId) {
        userDeletionService.deleteUserAssociatedRecords(userId);
        userService.deleteUser(userId);
        return ResponseEntity.ok("User is deleted");
    }
}
