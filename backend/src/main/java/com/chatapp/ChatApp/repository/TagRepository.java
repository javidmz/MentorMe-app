package com.chatapp.ChatApp.repository;

import com.chatapp.ChatApp.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Optional<Tag> findById(int tagId);
}
