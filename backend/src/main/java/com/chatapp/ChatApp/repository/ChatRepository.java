package com.chatapp.ChatApp.repository;

import com.chatapp.ChatApp.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    @Query("SELECT c FROM Chat c JOIN c.tags t WHERE t.name = :tagName AND " +
            "CONCAT(c.title, ' ', c.description) ILIKE %:search%")
    Page<Chat> findBySearchAndFilter(String search, String tagName, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Chat c JOIN c.tags t WHERE t.name = :tagName AND " +
            "CONCAT(c.title, ' ', c.description) ILIKE %:search%")
    int findTotalRecords(String search, String tagName);

    @Query("SELECT c FROM Chat c JOIN c.tags t WHERE t.name = :tagName AND " +
            "CONCAT(c.title, ' ', c.description) ILIKE %:search% AND " +
            "c.chatCreator.id = :userId")
    List<Chat> findByUserIdAndSearchAndFilter(int userId, String search, String tagName, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Chat c JOIN c.tags t WHERE t.name = :tagName AND " +
            "CONCAT(c.title, ' ', c.description) ILIKE %:search% AND " +
            "c.chatCreator.id = :userId")
    int findTotalNumberOfChatsByUserId(int userId, String search, String tagName);

    Chat findByTitle(String title);
}