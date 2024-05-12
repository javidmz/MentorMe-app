package com.chatapp.ChatApp.controller;

import com.chatapp.ChatApp.dto.*;
import com.chatapp.ChatApp.dto.request.CreateCommentRequest;
import com.chatapp.ChatApp.dto.request.UpdateCommentRequest;
import com.chatapp.ChatApp.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/comment/{commentId}")
    public ResponseEntity<CommentDTO> getChat(@PathVariable int commentId) {
        return ResponseEntity.ok(commentService.findCommentById(commentId));
    }


    @PostMapping("/comments")
    public ResponseEntity<CommentDTO> createComment(@RequestBody CreateCommentRequest commentRequest) {
        return new ResponseEntity<CommentDTO>(commentService.saveComment(commentRequest), new HttpHeaders(), HttpStatus.OK);
    }

    @PutMapping("/comment/{commentId}")
    public ResponseEntity<CommentDTO> updateComment(@PathVariable int commentId, @RequestBody UpdateCommentRequest commentRequest) {
        return new ResponseEntity<CommentDTO>(commentService.updateComment(commentId, commentRequest), new HttpHeaders(), HttpStatus.OK);
    }

    @PutMapping("/comment/{commentId}/increaseRank")
    public ResponseEntity<CommentDTO> increaseCommentRank(@PathVariable int commentId) {
        return ResponseEntity.ok(commentService.increaseCommentRank(commentId));
    }

    @PutMapping("/comment/{commentId}/decreaseRank")
    public ResponseEntity<CommentDTO> decreaseCommentRank(@PathVariable int commentId) {
        return ResponseEntity.ok(commentService.decreaseCommentRank(commentId));
    }


    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable int commentId) {
        commentService.deleteCommentById(commentId);
        return ResponseEntity.ok("Comment is deleted");
    }
}
