package com.rofish.server.api.posts.models;

import com.rofish.server.api.users.models.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @ManyToOne
    private User author;

    private String title;
    @NotNull
    private String content;
    @NotNull
    private Date date;
}
