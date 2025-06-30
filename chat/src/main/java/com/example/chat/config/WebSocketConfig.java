package com.example.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.*;


import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // ✅ Custom HandshakeHandler to set Principal from userId query param
    private static class CustomHandshakeHandler extends DefaultHandshakeHandler {
        @Override
        protected Principal determineUser(ServerHttpRequest request,
                                          WebSocketHandler wsHandler,
                                          Map<String, Object> attributes) {
            if (request instanceof ServletServerHttpRequest servletRequest) {
                String userId = servletRequest.getServletRequest().getParameter("userId");
                if (userId != null && !userId.isBlank()) {
                    return () -> userId; // Principal with name = userId
                }
            }
            return null; // No user ID
        }
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setHandshakeHandler(new CustomHandshakeHandler()) //  Register it
                .setAllowedOriginPatterns("*")
                .setHandshakeHandler(new CustomHandshakeHandler())
                .withSockJS(); 
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app"); // For @MessageMapping
        registry.enableSimpleBroker("/queue"); // For private messages
        registry.setUserDestinationPrefix("/user");
      
    }
}
