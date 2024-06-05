package com.sky.mapper;

import com.sky.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
//    public User getUserById(int id);

    User getUserByAccount(String account);

    int insertUser(User user);
    int updateUser(User user);
}
