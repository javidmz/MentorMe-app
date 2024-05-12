package com.chatapp.ChatApp.service.Impl;

import com.chatapp.ChatApp.dto.response.TagResponse;
import com.chatapp.ChatApp.entity.Tag;
import com.chatapp.ChatApp.exception.NotFoundException;
import com.chatapp.ChatApp.repository.TagRepository;
import com.chatapp.ChatApp.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public TagResponse getAllTags() {
        return TagResponse.builder()
                .tags(tagRepository.findAll())
                .build();
    }

    @Override
    public Tag findById(int tagId) {
        return tagRepository.findById(tagId).orElseThrow(() -> new NotFoundException("Not such tag!"));
    }

    @Override
    public Tag saveTag(String newTag) {
        Tag tag = Tag.builder()
                .name(newTag)
                .build();

        return tagRepository.save(tag);
    }
}
