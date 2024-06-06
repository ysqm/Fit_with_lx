package com.sky.mapper;

import com.sky.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    User getUserById(Integer id);

    User getUserByAccount(String account);

    Integer insertUser(User user);
    Integer updateUser(User user);

    List<Integer> getUser();
}
