package com.sky.service.impl;

import com.sky.dto.UserLoginDTO;
import com.sky.entity.User;
import com.sky.mapper.UserMapper;
import com.sky.service.UserService;
import io.swagger.models.auth.In;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public  Map<String,Object> getUserById(Integer id)
    {
        Map<String,Object> map = new HashMap<>();
        User user = userMapper.getUserById(id);
        if(user!=null){
            map.put("data",user);
            map.put("msg",0);
        } else {
            map.put("data",null);
            map.put("msg",-1);
        }
        return map;
    }

    public Map<String,Object> RegisterUser(User User)
    {
        Map<String,Object> result=new HashMap<>();
        User User1 = userMapper.getUserByAccount(User.getAccount());
        if(User1!=null){
            result.put("msg",-1);
        } else {
            User.setRegistrationTime(LocalDateTime.now());
            int status = userMapper.insertUser(User);
            result.put("msg",status);
        }
        return result;
    }

    public Map<String,Object> LoginUser(UserLoginDTO UserLoginDTO)
    {
        Map<String ,Object> result = new HashMap<>();
        String pwd = UserLoginDTO.getPassword();
        String Acount = UserLoginDTO.getUsername();
        User User1 = userMapper.getUserByAccount(Acount);
        if(User1!=null){
            if(pwd.equals(User1.getPassword())){
                User1.setLastLoginTime(LocalDateTime.now());
                userMapper.updateUser(User1);
                result.put("msg",0);
                result.put("data",User1);
            } else {
                result.put("msg",-1);
                result.put("data","Password Error");
            }
        } else {
            result.put("msg",-1);
            result.put("data","User not found");
        }
        return result;
    }

    public Map<String,Object> UpdateUser(User user)
    {
        user.setUpdateTime(LocalDateTime.now());
        int status = userMapper.updateUser(user);
        Map<String ,Object> result = new HashMap<>();
        result.put("msg",status);
        return result;
    }

    private boolean CreateUser(String account,String password)
    {
        User user = new User();
        user.setAccount(account);
        user.setPassword(password);
        user.setLastLoginTime(LocalDateTime.now());
        user.setAvatar("1");
        user.setRegistrationTime(LocalDateTime.now());
        user.setWechatId("2");
        int status = userMapper.insertUser(user);
        return true;
    }

    public Map<String,Object> Adduser(Integer num)
    {
        Map<String,Object> result = new HashMap<>();
        for(int i=0;i<num;i++) CreateUser(UUID.randomUUID().toString().replace("-", ""), UUID.randomUUID().toString().replace("-", ""));
        result.put("msg",0);
        return result;
    }
}
