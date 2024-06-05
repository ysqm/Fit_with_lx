package com.sky.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer m_id;
    private String text;
    private LocalDateTime date;
    private LocalDateTime LatestReply;
    private Integer isExpired;
    private Integer type;
    private String location;
    private Integer faMessage;
    private Integer userId;
    private Integer likes;
    private User user;
}
