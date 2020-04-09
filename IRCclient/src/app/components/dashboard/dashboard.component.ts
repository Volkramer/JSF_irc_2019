import { AuthenticationService } from './../../services/Api/Authen/AuthenticationService';
///////////////////////////////////////////////////////////////////////////////////
/*SERVICES*/
import { ChatService } from '../../services/Socket/chat.service';
import { ChannelMessageService } from '../../services/Api/Channel/ChannelMessageService';
import { ChannelService } from '../../services/Api/Channel/ChannelService';
import { ChannelUserService } from '../../services/Api/Channel/ChannelUserService';
import { MessageService } from '../../services/Api/Message/MessageService';
import { MessageUserService } from '../../services/Api/Message/MessageUserService';
import { UserService } from '../../services/Api/User/UserService';
import { ApiCommands } from '../../services/Api/ApiCommands';
import { CustomerService } from './../../services/Api/Authen/CustomerService';
///////////////////////////////////////////////////////////////////////////////////
/*ANGULAR MODULE*/
import { Component, OnInit } from '@angular/core';
///////////////////////////////////////////////////////////////////////////////////
/*COMPONENTS*/
///////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'IRCclient';
  message: string;
  messages: string[] = [];
  channels: Object;
  msg: Object;
  user: Object;
  userChannels: Object;
  users: Object;
  channelsUsers: Object;
  channelMessages: Object;
  messagesUsers: Object;
  channelId;
  time;
  private ApiCmd = new ApiCommands('');
  customer = new CustomerService();

  constructor(private chatService: ChatService) {
    this.user = this.customer.getUser();
  }

  async sendMessage(newMessage) {
    // this.channelId => SEULEMENT QUAND ON SELECTIONNE LE CHANNEL
    // this.customer.getUser() => ID USER
    this.message = newMessage.value;
    var param = this.message.split(/ (.*)/)[1];
    //this.messages.push(this.message); // PUSH MESSAGE SEND
    if (this.message.startsWith('/join')) {
      const data = {
        channelName: param,
        userId: this.user['id'],
      };
      this.chatService.joinChannel(data);
      this.userChannels = await this.ApiCmd.getUserChannels(this.user['id']);
      this.channels = await this.ApiCmd.getChannels('');
    } else if (this.message.startsWith('/nick')) {
      //this.chatService.newNickname(data);
    } else if (this.message.startsWith('/leave')) {
      const data = {
        channelId: this.channelId,
        userId: this.user['id'],
      };
      this.clear(this.time);
      this.chatService.leaveChannel(data);
      this.userChannels = await this.ApiCmd.getUserChannels(this.user['id']);
      this.channels = await this.ApiCmd.getChannels('');
      this.channelMessages = null
      return
    } else if (this.message !== '') {
      const data = {
        message: this.message,
        userId: this.user['id'],
        username: this.user['username'],
        channelId: this.channelId,
      };
      this.chatService.sendMessage(data);
    }
    newMessage.value = '';
    this.channelMessages = await this.ApiCmd.getChannelMessages(this.channelId); // GET CHANNEL MSG AFTER PUSH
    return;
  }

  async getChanMsgs(channelId) {
    this.clear(this.time);
    this.messages = null;
    await this.delay(1, async () => {
      this.channelMessages = await this.ApiCmd.getChannelMessages(channelId); // GET CHANNEL MSG EVERY 3SEC
      this.channelId = channelId;
    });
  }

  delay = (time, callback) => {
    this.time = setInterval(callback, time * 1000);
  };

  clear = (time) => {
    clearInterval(time);
  };

  async ngOnInit() {
    this.channels = await this.ApiCmd.getChannels('');
    this.userChannels = await this.ApiCmd.getUserChannels(this.user['id']);
  }
}

// console.log(this.channels);
// this.users = await this.ApiCmd.getUsers("")
// console.log(this.users);
// this.msg = await this.ApiCmd.getMessages("")
// console.log(this.msg)
// this.channelsUsers = await this.ApiCmd.getChannelsUsers()
// console.log(this.channelsUsers);
// this.channelsMessages = await this.ApiCmd.getChannelsMessages()
// await console.log(this.channelsMessages);
// this.messagesUsers = await this.ApiCmd.getMessagesUsers()
// await console.log(this.messagesUsers);
