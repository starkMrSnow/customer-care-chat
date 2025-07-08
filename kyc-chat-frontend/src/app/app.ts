import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'chat-frontend';
}
