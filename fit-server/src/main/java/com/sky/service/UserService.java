package com.sky.service;

import com.sky.dto.UserLoginDTO;
import com.sky.entity.User;

import java.util.List;
import java.util.Map;

public interface UserService {

    Map<String, Object> getUserById(Integer id);
    /**
     * 用户注册
     *
     * @param User UserTab
     * @return Status
     */
    Map<String,Object> RegisterUser(User User);
    /**
     * 用户登录
     *
     * @param UserLoginDTO username,pwd
     * @return Users
     */
    Map<String,Object> LoginUser(UserLoginDTO UserLoginDTO);
    /**
     * 用户信息修改
     *
     * @param user UserTab
     * @return Status
     */
    Map<String,Object> UpdateUser(User user);

    Map<String,Object> Adduser(Integer num);

}
