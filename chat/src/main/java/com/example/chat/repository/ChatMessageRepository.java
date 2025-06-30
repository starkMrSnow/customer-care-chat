package com.example.chat.repository;

import com.example.chat.model.ChatMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, Long> {
    List<ChatMessageEntity> findBySenderIdAndReceiverIdOrderByTimestampAsc(String senderId, String receiverId);
}
