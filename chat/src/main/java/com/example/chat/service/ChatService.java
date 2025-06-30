package com.example.chat.service;

import com.example.chat.model.ChatMessageEntity;
import com.example.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository repository;

    public ChatMessageEntity save(ChatMessageEntity message) {
        return repository.save(message);
    }

    public List<ChatMessageEntity> getMessages(String senderId, String receiverId) {
        return repository.findBySenderIdAndReceiverIdOrderByTimestampAsc(senderId, receiverId);
    }
}
