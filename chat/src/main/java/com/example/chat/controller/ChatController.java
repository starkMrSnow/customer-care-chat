package com.example.chat.controller;

import com.example.chat.dto.ChatMessage;
import com.example.chat.model.ChatMessageEntity;
import com.example.chat.service.ChatService;
import lombok.RequiredArgsConstructor;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectedEvent;

import java.security.Principal;
import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    @MessageMapping("/chat.sendMessage")
    public void receiveMessage(@Payload ChatMessage message, Principal principal) {
    if (message.getTimestamp() == null) {
        message.setTimestamp(LocalDateTime.now());
    }

    // Save to DB
    ChatMessageEntity saved = chatService.save(ChatMessageEntity.builder()
            .senderId(message.getSenderId())
            .receiverId(message.getReceiverId())
            .content(message.getContent())
            .timestamp(message.getTimestamp())
            .build());

    System.out.println("Sending message to user: " + message.getReceiverId());

   
    messagingTemplate.convertAndSendToUser(
            message.getReceiverId(),
            "/queue/messages",
            message
    );
}
    @EventListener
public void handleSessionConnected(SessionConnectedEvent event) {
    StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
    System.out.println("Connected session: " + accessor.getUser());
}
}