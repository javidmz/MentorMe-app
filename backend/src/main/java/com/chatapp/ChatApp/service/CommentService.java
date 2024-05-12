package com.chatapp.ChatApp.service;

import com.chatapp.ChatApp.dto.*;
import com.chatapp.ChatApp.dto.request.CreateCommentRequest;
import com.chatapp.ChatApp.dto.request.UpdateCommentRequest;
import com.chatapp.ChatApp.entity.Comment;
import org.springframework.data.domain.Sort;

public interface CommentService {
    Comment getCommentById(int theId);

    CommentDTO findCommentById(int theId);

    CommentOverviewListDTO findAllCommentsCreatedByUser(int userId, Integer pageNo, Integer pageSize, String sortBy, Sort.Direction direction, String search);

    CommentDTO saveComment(CreateCommentRequest commentRequest);

    CommentDTO updateComment(int commentId, UpdateCommentRequest theComment);

    CommentDTO increaseCommentRank(int replyId);

    CommentDTO decreaseCommentRank(int replyId);

    void deleteCommentById(int theId);
}
