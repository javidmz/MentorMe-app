package com.chatapp.ChatApp.controller;

import com.chatapp.ChatApp.dto.request.CreateReplyRequest;
import com.chatapp.ChatApp.dto.ReplyDTO;
import com.chatapp.ChatApp.dto.request.UpdateReplyRequest;
import com.chatapp.ChatApp.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReplyController {

    private final ReplyService replyService;

    @PostMapping("/replies")
    public ResponseEntity<ReplyDTO> createReply(@RequestBody CreateReplyRequest replyRequest) {
        return ResponseEntity.ok(replyService.saveReply(replyRequest));
    }

    @PutMapping("/reply/{replyId}")
    public ResponseEntity<ReplyDTO> updateReply(@PathVariable int replyId, @RequestBody UpdateReplyRequest replyRequest) {
        return ResponseEntity.ok(replyService.updateReply(replyId, replyRequest));
    }

    @PutMapping("/reply/{replyId}/increaseRank")
    public ResponseEntity<ReplyDTO> increaseReplyRank(@PathVariable int replyId) {
        return ResponseEntity.ok(replyService.increaseReplyRank(replyId));
    }

    @PutMapping("/reply/{replyId}/decreaseRank")
    public ResponseEntity<ReplyDTO> decreaseReplyRank(@PathVariable int replyId) {
        return ResponseEntity.ok(replyService.decreaseReplyRank(replyId));
    }
    @DeleteMapping("/reply/{replyId}")
    public ResponseEntity<String> deleteReply(@PathVariable int replyId) {
        replyService.deleteReplyById(replyId);
        return ResponseEntity.ok("Reply is deleted");
    }
}
