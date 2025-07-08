import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatWebsocketService } from '../../service/chat-websocket';
import { IMessage } from '@stomp/stompjs';

interface Message {
  id?: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'admin';
  senderId?: string;
  receiverId?: string;
}

@Component({
  selector: 'app-customer-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './customer-chat.html',
  styleUrls: ['./customer-chat.scss']
})
export class CustomerChat implements OnInit {
  messages: Message[] = [];
  newMessageText: string = '';
  username: string = '';

  constructor(private chatSocket: ChatWebsocketService) {}

  ngOnInit(): void {
    const storedName = localStorage.getItem('chat-username');
    if (!storedName) {
      window.location.href = '/welcome';
      return;
    }

    this.username = storedName;

    this.chatSocket.connect((messageFrame) => {
      const received = JSON.parse(messageFrame.body);
      this.messages.push({
        id: received.id,
        content: received.content,
        timestamp: new Date(received.timestamp),
        sender: received.senderId === 'admin' ? 'admin' : 'user',
      });
    });
  }

  sendCustomerMessage() {
    if (!this.newMessageText.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: this.username,
      receiverId: 'admin',
      content: this.newMessageText.trim(),
      timestamp: new Date(),
      sender: 'user'
    };

    this.messages.push(newMessage);
    this.newMessageText = '';
    this.chatSocket.sendMessage('/app/chat.sendMessage', newMessage);
  }
}
