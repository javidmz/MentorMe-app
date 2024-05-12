package com.chatapp.ChatApp.service.Impl;

import com.chatapp.ChatApp.entity.Chat;
import com.chatapp.ChatApp.entity.Comment;
import com.chatapp.ChatApp.entity.Reply;
import com.chatapp.ChatApp.entity.User;
import com.chatapp.ChatApp.repository.ChatRepository;
import com.chatapp.ChatApp.repository.CommentRepository;
import com.chatapp.ChatApp.repository.ReplyRepository;
import com.chatapp.ChatApp.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDeletionServiceImpl implements UserDeletionService {

    private final UserService userService;
    private final ReplyService replyService;
    private final ChatRepository chatRepository;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;

    @Override
    public void deleteUserAssociatedRecords(int userId) {
        User user = userService.getUserById(userId);
        List<Chat> chatsByUser = user.getChats();
        List<Comment> commentsByUser = user.getComments();
        List<Reply> repliesByFromUser = user.getReplies();
        List<Reply> repliesToTargetUser = replyService.findAllRepliesToTargetUser(user);

        for(Chat c : chatsByUser) {
            c.setChatCreator(null);
            chatRepository.save(c);
        }
        for (Comment c : commentsByUser) {
            c.setCommentMaker(null);
            commentRepository.save(c);
        }
        for(Reply r : repliesByFromUser) {
            r.setFromUser(null);
            replyRepository.save(r);
        }
        for (Reply r : repliesToTargetUser) {
            r.setTargetUser(null);
            replyRepository.save(r);
        }

    }
}
