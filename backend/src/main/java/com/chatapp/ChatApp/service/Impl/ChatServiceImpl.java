package com.chatapp.ChatApp.service.Impl;

import com.chatapp.ChatApp.dto.*;
import com.chatapp.ChatApp.dto.request.CreateChatRequest;
import com.chatapp.ChatApp.entity.*;
import com.chatapp.ChatApp.exception.NotFoundException;
import com.chatapp.ChatApp.exception.NotUniqueException;
import com.chatapp.ChatApp.mapper.ChatMapper;
import com.chatapp.ChatApp.repository.ChatRepository;
import com.chatapp.ChatApp.service.ChatService;
import com.chatapp.ChatApp.service.TagService;
import com.chatapp.ChatApp.service.UserService;
import com.chatapp.ChatApp.validator.InputValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
    private final UserService userService;
    private final TagService tagService;
    private final ChatMapper chatMapper;
    private final InputValidation<CreateChatRequest> inputValidation;

    @Override
    public ChatListDTO findAll(
            Integer pageNo,
            Integer pageSize,
            String sortBy,
            Sort.Direction direction,
            String tag,
            String search
    ) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(direction, sortBy));
        Page<Chat> pagedResult = chatRepository.findBySearchAndFilter(search, tag, paging);
        int totalRecords = chatRepository.findTotalRecords(search, tag);

        return ChatListDTO.builder()
                .chatList(chatMapper.chatListToChatListDTO(pagedResult.getContent()))
                .totalRecords(totalRecords)
                .build();
    }

    @Override
    public ChatDTO findChatById(int theId) {
        return chatMapper.chatToChatDTO(
                chatRepository.findById(theId).orElseThrow(() -> new NotFoundException("Chat does not exist.")));
    }

    @Override
    public ChatOverviewListDTO findAllChatsCreatedByUser(
            int userId,
            Integer pageNo,
            Integer pageSize,
            String sortBy,
            Sort.Direction direction,
            String tag,
            String search
    ) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(direction, sortBy));
        List<Chat> chatPage = chatRepository.findByUserIdAndSearchAndFilter(userId, search, tag, paging);
        int totalRecords = chatRepository.findTotalNumberOfChatsByUserId(userId, search, tag);

        return ChatOverviewListDTO.builder()
                .chatOverviewDTOList(chatMapper.chatListToOverviewDTO(chatPage))
                .totalRecords(totalRecords)
                .build();
    }

    @Override
    public Chat getChat(int theId) {
        return chatRepository.findById(theId).
                orElseThrow(() -> new NotFoundException("Chat does not exist!"));
    }

    @Override
    public Chat findByTitle(String title) {
        return chatRepository.findByTitle(title);
    }

    @Override
    public ChatDTO saveChat(CreateChatRequest newChat) {
        Chat isUniqueChat = findByTitle(newChat.getTitle());

        if(isUniqueChat != null)
            throw new NotUniqueException("This title is used");

        inputValidation.validate(newChat);

        Chat chat = Chat.builder()
                .title(newChat.getTitle())
                .creationDate(LocalDateTime.now())
                .rank(0)
                .description(newChat.getDescription())
                .chatCreator(userService.getUserById(newChat.getUserId()))
                .comments(new ArrayList<>())
                .build();

        List<Tag> tags = getChatTags(newChat);
        chat.setTags(tags);

        Chat savedChat = chatRepository.save(chat);
        return chatMapper.chatToChatDTO(savedChat);
    }

    private List<Tag> getChatTags(CreateChatRequest newChat) {
        ArrayList<Tag> tags = new ArrayList<Tag>();

        tags.add(tagService.findById(1));
        for(int tagId : newChat.getTagIdList())
            tags.add(tagService.findById(tagId));

        return tags;
    }

    @Override
    public ChatDTO updateChat(int theId, CreateChatRequest theChat) {
        Chat updateChat = chatRepository.findById(theId)
                .orElseThrow(() -> new NotFoundException("Chat does not exist"));
        inputValidation.validate(theChat);

        updateChat.setTitle(theChat.getTitle());
        updateChat.setDescription(theChat.getDescription());
        updateChat.setTags(getChatTags(theChat));

        return chatMapper.chatToChatDTO(chatRepository.save(updateChat));
    }

    @Override
    public void deleteChatById(int theId) {
        findChatById(theId);
        chatRepository.deleteById(theId);
    }

    @Override
    public ChatDTO increaseChatRank(int chatId) {
        Chat chat = getChat(chatId);
        chat.setRank(chat.getRank() + 1);
        return chatMapper.chatToChatDTO(chatRepository.save(chat));
    }

    @Override
    public ChatDTO decreaseChatRank(int chatId) {
        Chat chat = getChat(chatId);
        chat.setRank(chat.getRank() - 1);
        return chatMapper.chatToChatDTO(chatRepository.save(chat));
    }
}
