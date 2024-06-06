package com.sky.service.impl;

import com.sky.dto.GetMessageDTO;
import com.sky.entity.Message;
import com.sky.mapper.MessageMapper;
import com.sky.service.MessageService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MessageServiceImpl implements MessageService {
    private final MessageMapper messageMapper;

    public MessageServiceImpl(MessageMapper messageMapper) {
        this.messageMapper = messageMapper;
    }

    public Map<String,Object> getMessages(GetMessageDTO getMessageDTO) {
        Map<String,Object> result = new HashMap<>();
        Integer userId = getMessageDTO.getId();
        Integer type = getMessageDTO.getType();
        Integer L = getMessageDTO.getL();
        Integer R = getMessageDTO.getR();
        Integer mId = getMessageDTO.getM_Id();
        if(userId != null && type != null) {
            List<Message> Status = messageMapper.getMessagesByUserIdAndType(type,userId);
            if(Status != null && !Status.isEmpty()) {
                result.put("data", Status);
                result.put("msg",1);
            } else {
                result.put("msg",-1);
            }
        } else if(type != null && L != null) {
            List<Message> Status = messageMapper.getMessagesByTypeAndRange(type,L,R);
            if(Status != null && !Status.isEmpty()) {
                result.put("data", Status);
                result.put("msg",1);
            } else {
                result.put("msg",-1);
            }
        } else if(mId != null && L != null) {
            List<Message> Status = messageMapper.getRepliesByMessageIdAndRange(mId,L,R);
            if(Status != null && !Status.isEmpty()) {
                result.put("data", Status);
                result.put("msg",1);
            } else {
                result.put("msg",-1);
            }
        } else {
            result.put("msg",-1);
        }
        return result;
    }
}
