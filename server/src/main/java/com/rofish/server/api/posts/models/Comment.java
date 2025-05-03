package com.rofish.server.api.posts.models;

import com.rofish.server.api.users.models.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @ManyToOne
    private User author;

    @NotNull
    @ManyToOne
    private Post post;

    @ManyToOne
    private Comment parentComment;

    @NotNull
    private String content;

    @NotNull
    private Date date;
}
