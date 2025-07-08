package com.example.chat.controller;

import com.example.chat.dto.ChatMessage;
import com.example.chat.model.ChatMessageEntity;
import com.example.chat.repository.ChatMessageRepository;
import com.example.chat.service.ChatService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectedEvent;

import java.security.Principal; 
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    @Autowired
    private ChatMessageRepository chatMessageRepository;


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
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/chatgetMessages")
    public List<ChatMessageEntity> fetchMessage(){
        List<ChatMessageEntity> messages = chatMessageRepository.findAll();
        return messages.stream().map(message -> new ChatMessageEntity(
            message.getId(),
            message.getSenderId(),
            message.getReceiverId(),
            message.getContent(),
            message.getTimestamp()
        )).collect(Collectors.toList());

    }
}