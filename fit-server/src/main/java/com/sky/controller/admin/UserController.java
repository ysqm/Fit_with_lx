package com.sky.controller.admin;

import com.sky.dto.UserLoginDTO;
import com.sky.entity.User;
import com.sky.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/user")
@Slf4j
@Api(tags = "用户相关接口")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @ApiOperation("用户注册")
    public Map<String, Object> register(User user) {return userService.RegisterUser(user);}

    @PostMapping("/login")
    @ApiOperation("用户登录")
    public Map<String, Object> login(UserLoginDTO user) {return userService.LoginUser(user);}

    @PostMapping("/update")
    @ApiOperation("用户信息修改")
    public Map<String, Object> update(User user) {return userService.UpdateUser(user);}

    @PostMapping("/getUserById")
    @ApiOperation("通过Id获取用户信息")
    public Map<String, Object> getUserById(Integer id) {return userService.getUserById(id);}

    @PostMapping("/testadduser")
    @ApiOperation("添加用户")
    public Map<String, Object> testadduser(Integer num) {return userService.Adduser(num);}
}
