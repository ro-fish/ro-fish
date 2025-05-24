package com.rofish.server.api.posts.controllers;

import com.rofish.server.api.posts.models.Comment;
import com.rofish.server.api.posts.models.Post;
import com.rofish.server.api.posts.repositories.CommentRepository;
import com.rofish.server.api.posts.repositories.PostRepository;
import com.rofish.server.api.users.models.User;
import com.rofish.server.components.services.AuthManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class CommentController {

    PostRepository postRepository;
    CommentRepository commentRepository;

    public CommentController(PostRepository postRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    @Operation(
        summary = "Get comments for a post",
        description = "Retrieves all comments for a specific post. The user must be logged in.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Comments retrieved successfully"),
            @ApiResponse(responseCode = "400", description = "Post not found or user not logged in")
        }
    )
    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        Authentication authentication = AuthManager.getAuthentication();
        if (authentication == null) {
            return ResponseEntity.badRequest().build();
        }

        Post post = postRepository.getPostById(postId);
        if (post == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Comment> comments = commentRepository.findAllByPost(post);
        return ResponseEntity.ok(comments);
    }

    @Operation(
        summary = "Comment to a post",
        description = "Adds a comment to a post. The user must be logged in.",
        responses = {
            @ApiResponse(responseCode = "200", description = "Comment added successfully"),
            @ApiResponse(responseCode = "400", description = "User not logged in"),
            @ApiResponse(responseCode = "404", description = "Post not found"),
        }
    )
    @PostMapping("/{postId}/comment")
    public ResponseEntity<String> addComment(@PathVariable Long postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.badRequest().body("User not logged in.");
        }

        Post parentPost = postRepository.getPostById(postId);
        if (parentPost == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }

        Comment comment = Comment.builder().author((User) authentication.getPrincipal())
            .post(parentPost).parentComment(null).content("").date(new Date()).build();
        commentRepository.save(comment);

        return ResponseEntity.ok("Comment added successfully");
    }

    @PostMapping("/{commentId}/reply")
    public ResponseEntity<String> replyToComment(@PathVariable Long commentId,
        @RequestBody String content) {
        Authentication authentication = AuthManager.getAuthentication();
        if (authentication == null) {
            return ResponseEntity.badRequest().body("User not logged in.");
        }

        Comment parentComment = commentRepository.findById(commentId).orElse(null);
        if (parentComment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }

        Comment replyComment = Comment.builder()
            .author((User) authentication.getPrincipal())
            .post(parentComment.getPost())
            .parentComment(parentComment)
            .content(content)
            .date(new Date())
            .build();
        commentRepository.save(replyComment);

        return ResponseEntity.ok("Reply added successfully");
    }
}