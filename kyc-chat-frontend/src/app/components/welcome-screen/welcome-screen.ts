import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './welcome-screen.html',
  styleUrls: ['./welcome-screen.scss']
})
export class WelcomeScreen {
  username: string = '';

  constructor(private router: Router) {}

  onStartChat(): void {
    const trimmedName = this.username.trim();
    if (trimmedName) {
      localStorage.setItem('chat-username', trimmedName);
      this.router.navigate(['/customer-chat']);
    }
  }
}
