package com.sky.mapper;

import com.sky.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    User getUserById(Integer id);

    User getUserByAccount(String account);

    Integer insertUser(User user);
    Integer updateUser(User user);
}
