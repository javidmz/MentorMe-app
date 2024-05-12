package com.chatapp.ChatApp.service;

import com.chatapp.ChatApp.dto.*;
import com.chatapp.ChatApp.dto.request.CreateReplyRequest;
import com.chatapp.ChatApp.dto.request.UpdateReplyRequest;
import com.chatapp.ChatApp.entity.Reply;
import com.chatapp.ChatApp.entity.User;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface ReplyService {

    Reply getReplyById(int theId);

    List<Reply> findAllRepliesToTargetUser(User user);

    ReplyOverviewListDTO findAllRepliesByUserIdAndSearch(int userId, Integer pageNo, Integer pageSize, String sortBy, Sort.Direction direction, String search);

    ReplyDTO saveReply(CreateReplyRequest newReply);

    ReplyDTO updateReply(int replyId, UpdateReplyRequest theReply);

    void deleteReplyById(int theId);
    ReplyDTO increaseReplyRank(int replyId);
    ReplyDTO decreaseReplyRank(int replyId);
}
