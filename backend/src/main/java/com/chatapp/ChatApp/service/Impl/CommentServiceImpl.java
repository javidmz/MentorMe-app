package com.chatapp.ChatApp.service.Impl;

import com.chatapp.ChatApp.dto.*;
import com.chatapp.ChatApp.dto.request.CreateCommentRequest;
import com.chatapp.ChatApp.dto.request.UpdateCommentRequest;
import com.chatapp.ChatApp.entity.Comment;
import com.chatapp.ChatApp.exception.NotFoundException;
import com.chatapp.ChatApp.mapper.CommentMapper;
import com.chatapp.ChatApp.repository.CommentRepository;
import com.chatapp.ChatApp.service.ChatService;
import com.chatapp.ChatApp.service.CommentService;
import com.chatapp.ChatApp.service.UserService;
import com.chatapp.ChatApp.validator.InputValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserService userService;
    private final ChatService chatService;
    private final CommentMapper commentMapper;
    private final InputValidation<CreateCommentRequest> createCommentRequestInputValidation;
    private final InputValidation<UpdateCommentRequest> updateCommentRequestInputValidation;

    @Override
    public Comment getCommentById(int theId) {
        return commentRepository.findById(theId).orElseThrow(() -> new NotFoundException("Comment does not exist"));
    }

    @Override
    public CommentOverviewListDTO findAllCommentsCreatedByUser(
            int userId,
            Integer pageNo,
            Integer pageSize,
            String sortBy,
            Sort.Direction direction,
            String search
    ) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(direction, sortBy));
        List<Comment> commentList = commentRepository.findByUserIdAndSearch(userId, search, paging);
        int totalRecords = commentRepository.findTotalNumberOfCommentsByUserId(userId, search);

        return CommentOverviewListDTO.builder()
                .commentOverviewDTOList(commentMapper.commentListToCommentOverviewListDTO(commentList))
                .totalRecords(totalRecords)
                .build();
    }

    @Override
    public CommentDTO findCommentById(int theId) {
        return commentMapper.commentToCommentDTO(commentRepository.
                findById(theId).orElseThrow(() -> new NotFoundException("Comment does not exist")));
    }

    @Override
    public CommentDTO saveComment(CreateCommentRequest commentRequest) {
        createCommentRequestInputValidation.validate(commentRequest);
        Comment comment = Comment.builder()
                .commentContent(commentRequest.getCommentContent())
                .rank(0)
                .replies(new ArrayList<>())
                .commentMaker(userService.getUserById(commentRequest.getCommenterId()))
                .chat(chatService.getChat(commentRequest.getChatId()))
                .creationDate(LocalDateTime.now())
                .build();

        Comment savedComment = commentRepository.save(comment);
        return commentMapper.commentToCommentDTO(savedComment);
    }

    @Override
    public CommentDTO updateComment(int commentId, UpdateCommentRequest theComment) {
        updateCommentRequestInputValidation.validate(theComment);

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Resource is not there"));

        comment.setCommentContent(theComment.getCommentContent());

        Comment updatedComment = commentRepository.save(comment);
        return commentMapper.commentToCommentDTO(updatedComment);
    }

    @Override
    public void deleteCommentById(int theId) {
        findCommentById(theId);
        commentRepository.deleteById(theId);
    }

    @Override
    public CommentDTO increaseCommentRank(int commentId) {
        Comment comment = getCommentById(commentId);
        comment.setRank(comment.getRank() + 1);
        return commentMapper.commentToCommentDTO(commentRepository.save(comment));
    }

    @Override
    public CommentDTO decreaseCommentRank(int commentId) {
        Comment comment = getCommentById(commentId);
        comment.setRank(comment.getRank() - 1);
        return commentMapper.commentToCommentDTO(commentRepository.save(comment));
    }
}
