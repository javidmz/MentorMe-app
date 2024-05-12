package com.chatapp.ChatApp.repository;

import com.chatapp.ChatApp.dto.ReplyDTO;
import com.chatapp.ChatApp.entity.Reply;
import com.chatapp.ChatApp.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Integer> {
    @Query("SELECT r FROM Reply r WHERE CONCAT(r.targetUser.username, ' ', r.replyContent) ILIKE %:search% AND " +
            "r.fromUser.id = :userId")
    List<Reply> findAllRepliesByUserIdAndSearch(int userId, String search, Pageable pageable);

    @Query("SELECT COUNT(r) FROM Reply r WHERE CONCAT(r.targetUser.username, ' ', r.replyContent) ILIKE %:search% AND " +
            "r.fromUser.id = :userId")
    int findTotalNumberOfRepliesByUserId(int userId, String search);

    List<Reply> findByTargetUser(User theUser);
}
