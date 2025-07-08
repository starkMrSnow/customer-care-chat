import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AfterViewChecked,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { ChatMessageEntity, ChatWebsocketService } from '../../service/chat-websocket';
import { IMessage } from '@stomp/stompjs';

interface User {
  UserId: string;
  name: string;
  UnreadCount: number;
  lastMessageTime?: Date;
}

interface Message {
  userId: string;
  messageId: string;
  timestamp: Date;
  content: string;
  sender: 'user' | 'admin';
  senderId: string;
  receiverId: string;
}

@Component({
  selector: 'app-admin-chat',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, FormsModule],
  templateUrl: './admin-chat.html',
  styleUrls: ['./admin-chat.scss'],
})
export class AdminChat implements OnInit, AfterViewChecked {
  @ViewChildren('messageBubble') messageBubbles!: QueryList<ElementRef>;

  users: User[] = [];
  messages: Message[] = [];
  newMessageText: string = '';
  selectedUserId: string | null = null;
  selectedUser: User | null = null;

  constructor(private chatSocket: ChatWebsocketService) {}

  ngOnInit(): void {
    console.log('Admin chatComponent Initialised');
    localStorage.setItem('chat-username', 'admin');

    this.fetchMesssage();

    this.chatSocket.connect((messageFrame) => {
      const received = JSON.parse(messageFrame.body);

      const senderId = received.senderId;
      const senderName = senderId;

      const incomingMessage: Message = {
        userId: senderId,
        messageId: received.id || `msg-${Date.now()}`,
        content: received.content || received.text,
        timestamp: new Date(received.timestamp),
        sender: received.senderId === 'admin' ? 'admin' : 'user',
        senderId,
        receiverId: received.receiverId,
      };

      this.messages.push(incomingMessage);

      let user = this.users.find((u) => u.UserId === senderId);
      if (!user) {
        user = {
          UserId: senderId,
          name: senderName,
          UnreadCount: 0,
        };
        this.users.push(user);
      }

      if (this.selectedUserId !== senderId) {
        user.UnreadCount++;
      }

      console.log('Admin received:', incomingMessage);
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      const chatArea = document.querySelector('.message-list');
      if (chatArea) {
        chatArea.scrollTop = chatArea.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  sendMessage() {
    if (!this.newMessageText.trim() || !this.selectedUserId) return;

    const newMessage: Message = {
      userId: this.selectedUserId,
      messageId: `msg-${Date.now()}`,
      content: this.newMessageText.trim(),
      timestamp: new Date(),
      sender: 'admin',
      senderId: 'admin',
      receiverId: this.selectedUserId,
    };

    this.messages.push(newMessage);
    this.chatSocket.sendMessage('/app/chat.sendMessage', newMessage);
    this.newMessageText = '';
    console.log('Message sent by admin:', newMessage);
  }

  get filteredMessage() {
    return this.messages.filter((msg) => msg.userId === this.selectedUserId);
  }

  showUserChat(UserId: string): void {
    this.selectedUserId = UserId;
    this.selectedUser = this.users.find((u) => u.UserId === UserId) || null;
    if (this.selectedUser) this.selectedUser.UnreadCount = 0;
    console.log('Selected user:', this.selectedUser);
  }

  messagesHistory: ChatMessageEntity[] = [];

  fetchMesssage(){
    this.chatSocket.getMessages().subscribe({
      next: (data) => {
        const historyMessages : Message[] = data.map( msg => ({
          userId: msg.senderId == 'admin' ? msg.receiverId : msg.senderId,
          messageId: `msg-${msg.id}`,
          content: msg.content,
          timestamp: new Date(msg.timeStamp),
          sender: msg.senderId == 'admin'? 'admin' : 'user',
          senderId: msg.senderId,
          receiverId: msg.receiverId,
        }));
        this.messages.push(...historyMessages);

        historyMessages.forEach(msg => {
          const userId = msg.userId;
          if (!this.users.find(u => u.UserId === userId)){
            this.users.push({ UserId: userId, name: userId, UnreadCount: 0 });
          }

           if (!this.selectedUserId && this.users.length > 0) {
        this.showUserChat(this.users[0].UserId);
      }
        });
       console.log("fetched and merged message history");
      },
    error: (error) => {
      console.error("Error fetching message history", error);
    }
    });
  }
}