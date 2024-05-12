package com.chatapp.ChatApp.service;

import com.chatapp.ChatApp.dto.response.TagResponse;
import com.chatapp.ChatApp.entity.Tag;

public interface TagService {

    TagResponse getAllTags();

    Tag findById(int tagId);

    Tag saveTag(String newTag);
}
