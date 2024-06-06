package com.sky.controller.admin;

import com.sky.dto.GetMessageDTO;
import com.sky.entity.Message;
import com.sky.service.MessageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/message")
@Slf4j
@Api(tags = "信息相关接口")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/getmsg")
    @ApiOperation("获取信息记录")
    public Map<String, Object> getMsg(GetMessageDTO getMessageDTO) {return messageService.getMessages(getMessageDTO);}

    @PostMapping("/getuser")
    @ApiOperation("获取用户信息")
    public Map<String, Object> getUser(Integer Id) {return messageService.getUserById(Id);}

    @PostMapping("/create")
    @ApiOperation("创建信息记录")
    public Map<String, Object> create(Message message) {return messageService.createMessage(message);}

    @PostMapping("/modify")
    @ApiOperation("更新点赞，过期，最新回复")
    public Map<String, Object> modify(Message message) {return messageService.updateMessage(message);}

}
