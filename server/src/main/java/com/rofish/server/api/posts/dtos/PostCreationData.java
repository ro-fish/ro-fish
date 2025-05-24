package com.rofish.server.api.posts.dtos;

import com.rofish.server.api.posts.models.Post;
import lombok.Getter;

@Getter
public class PostCreationData {

    private String title;
    private String content;
    private String thumbnailPath;
    private String imagePath;
}

