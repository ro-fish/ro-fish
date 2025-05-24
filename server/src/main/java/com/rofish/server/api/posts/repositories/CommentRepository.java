package com.rofish.server.api.posts.repositories;

import com.rofish.server.api.posts.models.Comment;
import com.rofish.server.api.posts.models.Post;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Long> {

    List<Comment> findAllByPost(@NotNull Post post);
}
