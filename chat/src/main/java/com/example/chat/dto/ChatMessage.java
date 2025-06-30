package com.example.chat.dto;
import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {
    private String senderId;
    private String receiverId;
    private String content;
    private LocalDateTime timestamp;
}
