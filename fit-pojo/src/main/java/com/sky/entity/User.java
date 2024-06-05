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
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;
    private String account;
    private String password;
    private String avatar;
    private String username;
    private String wechatId;
    private LocalDateTime registrationTime;
    private Boolean isLoggedOut;
    private LocalDateTime updateTime;
    private LocalDateTime lastLoginTime;
}
