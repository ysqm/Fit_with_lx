package com.sky.service;

import com.sky.dto.GetMessageDTO;
import com.sky.entity.Message;

import java.util.List;

public interface MessageService {
    List<Message> getMessages(GetMessageDTO getMessageDTO);
}
