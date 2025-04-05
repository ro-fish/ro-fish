package com.rofish.server.controllers;

import com.rofish.server.models.Post;
import com.rofish.server.models.User;
import com.rofish.server.repositories.PostRepository;
import com.rofish.server.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostController(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/create")
    public void createPost() {
        User author = userRepository.getUserByEmail("root@rofish.admin.ro");
        postRepository.save(new Post(author, "bb", "cc", new Date()));
    }

    @DeleteMapping("/delete/{postId}")
    public void deletePost(@PathVariable Long postId) {
        postRepository.deleteById(postId);
    }
}
