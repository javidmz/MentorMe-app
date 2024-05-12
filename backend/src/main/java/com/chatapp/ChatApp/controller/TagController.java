package com.chatapp.ChatApp.controller;

import com.chatapp.ChatApp.dto.response.TagResponse;
import com.chatapp.ChatApp.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @GetMapping
    public ResponseEntity<TagResponse> getAllTags() {
        return ResponseEntity.ok(tagService.getAllTags());
    }

    @PostMapping
    public ResponseEntity<Void> addNewTag(@RequestBody String newTag) {
        tagService.saveTag(newTag);
        return ResponseEntity.ok().build();
    }
}
