package com.example.chat.config;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;


public class CustomHandshakeHandler extends DefaultHandshakeHandler {

    @Override
    protected Principal determineUser(ServerHttpRequest request,
                                      WebSocketHandler wsHandler,
                                      Map<String, Object> attributes) {
        String uri = request.getURI().toString();
        String extractedUserId = extractUserIdFromUri(uri);

        final String userId = extractedUserId != null ? extractedUserId : "unknown";

   
        return () -> userId;
    }

  
    private String extractUserIdFromUri(String uri) {
        if (uri.contains("userId=")) {
            String userId = uri.substring(uri.indexOf("userId=") + 7);
            if (userId.contains("&")) {
                userId = userId.substring(0, userId.indexOf("&"));
            }
            return userId;
        }
        return null;
    }
}
