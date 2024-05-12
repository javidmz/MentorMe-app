package com.chatapp.ChatApp.mapper;

import com.chatapp.ChatApp.dto.CommentDTO;
import com.chatapp.ChatApp.dto.CommentOverviewDTO;
import com.chatapp.ChatApp.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(target = "commenter", source = "commentMaker")
    CommentDTO commentToCommentDTO(Comment comment);

    @Mapping(target = "chatId", source = "chat.id")
    @Mapping(target = "chatTitle", source = "chat.title")
    CommentOverviewDTO commentToCommentOverviewDTO(Comment comment);

    List<CommentOverviewDTO> commentListToCommentOverviewListDTO(List<Comment> commentList);
}
