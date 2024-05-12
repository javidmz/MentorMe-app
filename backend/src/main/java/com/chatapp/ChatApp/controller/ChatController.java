package com.chatapp.ChatApp.controller;

import com.chatapp.ChatApp.dto.ChatDTO;
import com.chatapp.ChatApp.dto.ChatListDTO;
import com.chatapp.ChatApp.dto.request.CreateChatRequest;
import com.chatapp.ChatApp.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/chats")
    public ResponseEntity<ChatListDTO> getAllChats(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") Sort.Direction direction,
            @RequestParam(defaultValue = "All") String tag,
            @RequestParam(defaultValue = "") String search
    ) {
        return ResponseEntity.ok(chatService.findAll(pageNo, pageSize, sortBy, direction, tag, search));
    }

    @GetMapping("/chat/{chatId}")
    public ResponseEntity<ChatDTO> getChat(@PathVariable int chatId) {
        ChatDTO chat = chatService.findChatById(chatId);

        if(chat == null)
            throw new RuntimeException("Not found what you search");

        return ResponseEntity.ok(chat);
    }

    @PostMapping("/chats")
    public ResponseEntity<ChatDTO> postChat(@RequestBody CreateChatRequest newChat) {
        ChatDTO chat = chatService.saveChat(newChat);
        return ResponseEntity.ok(chat);
    }

    @PutMapping("/chat/{chatId}")
    public ResponseEntity<ChatDTO> updateChat(@PathVariable int chatId, @RequestBody CreateChatRequest newChat) {
        ChatDTO chatDTO = chatService.updateChat(chatId, newChat);
        return ResponseEntity.ok(chatDTO);
    }

    @PutMapping("/chat/{chatId}/increaseRank")
    public ResponseEntity<ChatDTO> increaseChatRank(@PathVariable int chatId) {
        return ResponseEntity.ok(chatService.increaseChatRank(chatId));
    }

    @PutMapping("/chat/{chatId}/decreaseRank")
    public ResponseEntity<ChatDTO> decreaseChatRank(@PathVariable int chatId) {
        return ResponseEntity.ok(chatService.decreaseChatRank(chatId));
    }

    @DeleteMapping("/chat/{chatId}")
    public ResponseEntity<String> deleteChat(@PathVariable int chatId) {
        chatService.deleteChatById(chatId);
        return ResponseEntity.ok("Chat is deleted!");
    }
}
