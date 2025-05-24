package com.rofish.server.api.posts.models;

import com.rofish.server.api.users.models.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity(name = "comments")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @ManyToOne
    private User author;

    @NotNull
    @ManyToOne
    @Getter
    private Post post;

    @ManyToOne
    private Comment parentComment;

    @NotNull
    private String content;

    @NotNull
    private Date date;
}
