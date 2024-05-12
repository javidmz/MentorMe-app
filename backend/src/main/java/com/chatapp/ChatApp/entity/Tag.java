package com.chatapp.ChatApp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tags")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 30, nullable = false, unique = true)
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "tags")
    private List<Chat> chats = new ArrayList<>();

    private void addChats(Chat chat) {
        chats.add(chat);
    }
}
