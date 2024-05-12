package com.chatapp.ChatApp.repository;

import com.chatapp.ChatApp.entity.Comment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    @Query("SELECT c FROM Comment c WHERE c.commentContent ILIKE %:search% AND " +
            "c.commentMaker.id = :userId")
    List<Comment> findByUserIdAndSearch(int userId, String search, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.commentContent ILIKE %:search% AND " +
            "c.commentMaker.id = :userId")
    int findTotalNumberOfCommentsByUserId(int userId, String search);
}
