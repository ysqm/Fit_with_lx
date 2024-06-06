package com.sky.service;

import com.sky.dto.GetMessageDTO;
import com.sky.entity.Message;

import java.util.List;
import java.util.Map;

public interface MessageService {
    Map<String,Object> getMessages(GetMessageDTO getMessageDTO);
    Map<String,Object> createMessage(Message message);
    Map<String,Object> updateMessage(Message message);
    Map<String,Object> getUserById(Integer id);
}
