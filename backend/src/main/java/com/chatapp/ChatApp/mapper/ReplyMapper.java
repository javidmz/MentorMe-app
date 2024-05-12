package com.chatapp.ChatApp.mapper;

import com.chatapp.ChatApp.dto.ReplyDTO;
import com.chatapp.ChatApp.dto.ReplyOverviewDTO;
import com.chatapp.ChatApp.entity.Reply;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReplyMapper {
    ReplyDTO replyToReplyDTO(Reply reply);

    @Mapping(target = "chatId", source = "replyToComment.chat.id")
    @Mapping(target = "chatTitle", source = "replyToComment.chat.title")
    @Mapping(target = "repliedUsername", source = "targetUser.username")
    ReplyOverviewDTO replyToReplyOverviewDTO(Reply reply);

    List<ReplyOverviewDTO> replyListToReplyOverviewListDTO(List<Reply> replyList);
}
