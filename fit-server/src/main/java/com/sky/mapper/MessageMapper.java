package com.sky.mapper;

import com.sky.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.sky.entity.Message;

import java.util.List;

@Mapper
public interface MessageMapper {

    List<Message> getMessagesByTypeAndRange(@Param("type") Integer type, @Param("start") Integer start, @Param("end") Integer end);
    List<Message> getRepliesByMessageIdAndRange(@Param("messageId") Integer messageId, @Param("start") Integer start, @Param("end") Integer end);
    List<Message> getMessagesByUserIdAndType(@Param("type") Integer type, @Param("userId") Integer userId);
    User getUserById(@Param("userId") Integer userId);
    Integer insertMessage(@Param("message") Message message);
    Integer updateMessage(@Param("message") Message message);
}
