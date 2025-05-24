package com.rofish.server.api.posts.controllers;

import com.rofish.server.api.posts.dtos.PostCreationData;
import com.rofish.server.api.posts.models.Post;
import com.rofish.server.api.posts.repositories.PostRepository;
import com.rofish.server.api.users.models.User;
import com.rofish.server.components.services.AuthManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostRepository repository;

    public PostController(PostRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> allPosts = repository.findAll(Sort.by(Sort.Direction.DESC, "date"));
        return ResponseEntity.ok(allPosts);
    }

    @Operation(summary = "Add a new post.", description = "Adds a new post to the database. Only accessible by users with ADMIN role.", responses = {
        @ApiResponse(responseCode = "200", description = "Post added successfully.")})
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/add", consumes = "application/json")
    public ResponseEntity<String> addFishingSpot(@Valid @RequestBody PostCreationData data) {
        Authentication authentication = AuthManager.getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }

        Post newPost = Post.builder().title(data.getTitle()).content(data.getContent())
            .author((User) authentication.getPrincipal()).date(new Date())
            .imagePath(data.getImagePath()).thumbnailPath(data.getThumbnailPath()).build();
        repository.save(newPost);
        return ResponseEntity.ok().body("Post added successfully.");
    }

    @Operation(summary = "Delete a post.", description = "Deletes a post from the database. Only accessible by users with ADMIN role.", parameters = {
        @Parameter(name = "id", description = "ID of the post to delete.")}, responses = {
        @ApiResponse(responseCode = "200", description = "Post deleted successfully."),
        @ApiResponse(responseCode = "400", description = "Post not found.")})
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/remove/{id}")
    public ResponseEntity<String> deleteFishingSpot(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().body("Post deleted successfully.");
        }
        // sa poti sterge doar postari proprii? Discutie...

        return ResponseEntity.badRequest().body("Post not found.");
    }


}
