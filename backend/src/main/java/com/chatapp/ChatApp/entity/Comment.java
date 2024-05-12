package com.chatapp.ChatApp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "comment_content", nullable = false)
    private String commentContent;

    @Column(name = "comment_rank", nullable = false)
    private int rank;

    @Column(name = "chat_creation_date")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime creationDate;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private User commentMaker;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "chat_id")
    private Chat chat;

    @OneToMany(mappedBy = "replyToComment", cascade = CascadeType.ALL)
    private List<Reply> replies;

    public Comment(String commentContent, int rank) {
        this.commentContent = commentContent;
        this.rank = rank;
    }
}
