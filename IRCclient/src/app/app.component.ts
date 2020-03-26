import { ChatService } from './services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'IRCclient';
  message: string;
  messages: string[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage(newMessage) {
    this.message = newMessage.value;
    this.chatService.sendMessage(this.message);
    newMessage.value = '';
  }

  ngOnInit(): void {
    this.chatService.getMessage().subscribe((message: string) => {
      console.log(message);
      this.messages.push(message);
    });
  }
}
