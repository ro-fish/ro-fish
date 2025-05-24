package com.rofish.server.api.posts.repositories;

import com.rofish.server.api.posts.models.Post;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostRepository extends CrudRepository<Post, Long> {

    Post getPostById(long id);

    List<Post> findAll(Sort date);
}
