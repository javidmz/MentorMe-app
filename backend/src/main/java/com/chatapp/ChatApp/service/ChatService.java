package com.chatapp.ChatApp.service;

import com.chatapp.ChatApp.dto.*;
import com.chatapp.ChatApp.dto.request.CreateChatRequest;
import com.chatapp.ChatApp.entity.Chat;
import org.springframework.data.domain.Sort;

public interface ChatService {

    ChatListDTO findAll(
            Integer pageNo,
            Integer pageSize,
            String sortBy,
            Sort.Direction direction,
            String tag,
            String search
    );

    ChatDTO findChatById(int theId);

    ChatOverviewListDTO findAllChatsCreatedByUser(
            int userId,
            Integer pageNo,
            Integer pageSize,
            String sortBy,
            Sort.Direction direction,
            String tag,
            String search
    );

    Chat getChat(int theId);

    Chat findByTitle(String title);

    ChatDTO saveChat(CreateChatRequest newChat);

    ChatDTO updateChat(int theId, CreateChatRequest theChat);

    void deleteChatById(int theId);

    ChatDTO increaseChatRank(int chatId);

    ChatDTO decreaseChatRank(int chatId);
}