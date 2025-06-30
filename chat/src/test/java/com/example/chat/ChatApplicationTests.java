package com.example.chat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@SpringBootTest
class ChatApplicationTests {

    // 👇 This prevents Spring from trying to inject a real SimpMessagingTemplate
    @MockBean
    private SimpMessagingTemplate messagingTemplate;

    @Test
    void contextLoads() {
    }
}
