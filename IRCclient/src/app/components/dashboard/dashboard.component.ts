///////////////////////////////////////////////////////////////////////////////////
/*SERVICES*/
import { ChatService } from '../../services/Socket/chat.service';
import { ChannelMessageService }  from '../../services/Api/Channel/ChannelMessageService';
import { ChannelService }  from '../../services/Api/Channel/ChannelService';
import { ChannelUserService }  from '../../services/Api/Channel/ChannelUserService';
import { MessageService }  from '../../services/Api/Message/MessageService';
import { MessageUserService }  from '../../services/Api/Message/MessageUserService';
import { UserService }  from '../../services/Api/User/UserService';
///////////////////////////////////////////////////////////////////////////////////
/*ANGULAR MODULE*/
import { Component, OnInit } from '@angular/core';
///////////////////////////////////////////////////////////////////////////////////
/*COMPONENTS*/
///////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'IRCclient';
  message: string;
  messages: string[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage(newMessage) {
    this.message = newMessage.value;
    var param = this.message.split(' ')[1];
    if (this.message.startsWith('/join')) {
      this.chatService.joinChannel(param);
    } else if (this.message.startsWith('/nick')) {
      this.chatService.newNickname(param);
    } else {
      this.chatService.sendMessage(this.message);
    }
    newMessage.value = '';
  }

  ngOnInit(): void {
    this.chatService.getMessage().subscribe((message: string) => {
      console.log(message);
      this.messages.push(message);
    });
  }
}