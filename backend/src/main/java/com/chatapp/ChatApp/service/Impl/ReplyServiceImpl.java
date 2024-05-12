package com.chatapp.ChatApp.service.Impl;

import com.chatapp.ChatApp.dto.*;
import com.chatapp.ChatApp.dto.request.CreateReplyRequest;
import com.chatapp.ChatApp.dto.request.UpdateReplyRequest;
import com.chatapp.ChatApp.entity.Reply;
import com.chatapp.ChatApp.entity.User;
import com.chatapp.ChatApp.exception.NotFoundException;
import com.chatapp.ChatApp.mapper.ReplyMapper;
import com.chatapp.ChatApp.repository.ReplyRepository;
import com.chatapp.ChatApp.service.CommentService;
import com.chatapp.ChatApp.service.ReplyService;
import com.chatapp.ChatApp.service.UserService;
import com.chatapp.ChatApp.validator.InputValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {

    private final ReplyRepository replyRepository;
    private final UserService userService;
    private final CommentService commentService;
    private final ReplyMapper replyMapper;
    private final InputValidation<CreateReplyRequest> createReplyRequestInputValidation;
    private final InputValidation<UpdateReplyRequest> updateReplyRequestInputValidation;

    @Override
    public Reply getReplyById(int theId) {
        return replyRepository.findById(theId)
                .orElseThrow(() -> new NotFoundException("Reply does not exist!"));
    }

    @Override
    public List<Reply> findAllRepliesToTargetUser(User user) {
        return replyRepository.findByTargetUser(user);
    }


    @Override
    public ReplyOverviewListDTO findAllRepliesByUserIdAndSearch(
            int userId,
            Integer pageNo,
            Integer pageSize,
            String sortBy,
            Sort.Direction direction,
            String search
    ) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(direction, sortBy));
        List<Reply> replyList = replyRepository.findAllRepliesByUserIdAndSearch(userId, search, paging);
        int totalRecords = replyRepository.findTotalNumberOfRepliesByUserId(userId, search);

        return ReplyOverviewListDTO.builder()
                .replyOverviewDTOList(replyMapper.replyListToReplyOverviewListDTO(replyList))
                .totalRecords(totalRecords)
                .build();
    }

    @Override
    public ReplyDTO saveReply(CreateReplyRequest newReply) {
        createReplyRequestInputValidation.validate(newReply);
        Reply reply = Reply.builder()
                .replyContent(newReply.getReplyContent())
                .rank(0)
                .fromUser(userService.getUserById(newReply.getFromUserId()))
                .targetUser(userService.getUserById(newReply.getTargetUserId()))
                .replyToComment(commentService.getCommentById(newReply.getCommentId()))
                .creationDate(LocalDateTime.now())
                .build();

        Reply savedReply = replyRepository.save(reply);
        return replyMapper.replyToReplyDTO(savedReply);
    }

    @Override
    public ReplyDTO updateReply(int replyId, UpdateReplyRequest theReply) {
        updateReplyRequestInputValidation.validate(theReply);
        Reply reply = getReplyById(replyId);
        reply.setReplyContent(theReply.getReplyContent());
        replyRepository.save(reply);
        return replyMapper.replyToReplyDTO(reply);
    }

    @Override
    public void deleteReplyById(int theId) {
        getReplyById(theId);
        replyRepository.deleteById(theId);
    }

    @Override
    public ReplyDTO increaseReplyRank(int replyId) {
        Reply reply = getReplyById(replyId);
        reply.setRank(reply.getRank() + 1);
        return replyMapper.replyToReplyDTO(replyRepository.save(reply));
    }

    @Override
    public ReplyDTO decreaseReplyRank(int replyId) {
        Reply reply = getReplyById(replyId);
        reply.setRank(reply.getRank() - 1);
        return replyMapper.replyToReplyDTO(replyRepository.save(reply));
    }
}
