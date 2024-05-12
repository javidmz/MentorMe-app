package com.chatapp.ChatApp.mapper;

import com.chatapp.ChatApp.dto.ChatDTO;
import com.chatapp.ChatApp.dto.ChatOverviewDTO;
import com.chatapp.ChatApp.dto.CommentDTO;
import com.chatapp.ChatApp.dto.UserDTO;
import com.chatapp.ChatApp.entity.Chat;
import com.chatapp.ChatApp.entity.Comment;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ChatMapper {
    ChatMapper INSTANCE = Mappers.getMapper(ChatMapper.class);

    @BeanMapping(builder = @Builder(disableBuilder = true))
    @Mapping(target = "chatCreationDate", source = "creationDate")
    ChatDTO chatToChatDTO(Chat chat);

    List<ChatDTO> chatListToChatListDTO(List<Chat> chatList);

    ChatOverviewDTO chatToChatOverviewDTO(Chat chat);

    List<ChatOverviewDTO> chatListToOverviewDTO(List<Chat> chatList);

    @AfterMapping
    default void afterMap(@MappingTarget ChatDTO chatDTO, Chat chat) {
        if (chat != null) {
            chatDTO.setTags(chatDTO.getTags().stream().filter(tag -> !Objects.equals(tag.getName(), "All")).collect(Collectors.toList()));
            List<CommentDTO> commentDTOList = chatDTO.getComments();
            List<Comment> commentList = chat.getComments();
            for(int i = 0; i < commentDTOList.size(); i++) {
                if(commentList.get(i).getCommentMaker() == null)
                    commentDTOList.get(i).setCommenter(null);
                else commentDTOList.get(i).setCommenter(UserDTO.builder()
                                .id(commentList.get(i).getCommentMaker().getId())
                                .firstName(commentList.get(i).getCommentMaker().getFirstName())
                                .lastName(commentList.get(i).getCommentMaker().getLastName())
                                .username(commentList.get(i).getCommentMaker().getUsername())
                        .build());
            }
        }
    }
}
