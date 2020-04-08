import { AuthenticationService } from './../../services/Api/Authen/AuthenticationService';
///////////////////////////////////////////////////////////////////////////////////
/*SERVICES*/
import { ChatService } from '../../services/Socket/chat.service';
import { ChannelMessageService }  from '../../services/Api/Channel/ChannelMessageService';
import { ChannelService }  from '../../services/Api/Channel/ChannelService';
import { ChannelUserService }  from '../../services/Api/Channel/ChannelUserService';
import { MessageService }  from '../../services/Api/Message/MessageService';
import { MessageUserService }  from '../../services/Api/Message/MessageUserService';
import { UserService }  from '../../services/Api/User/UserService';
import { ApiCommands } from '../../services/Api/ApiCommands'
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
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'IRCclient';
  message: string;
  messages: string[] = [];
  channels : Object;
  msg : Object;
  users : Object;
  channelsUsers : Object;
  channelMessages : Object;
  messagesUsers : Object;
  channelId;
  time;
  private ApiCmd = new ApiCommands("")
  customer = new CustomerService();

  constructor(private chatService: ChatService) {

  }

  async sendMessage(newMessage) {

    // this.channelId => SEULEMENT QUAND ON SELECTIONNE LE CHANNEL
    // this.customer.getUser() => ID USER 
    this.message = newMessage.value;
    var param = this.message.split(' ')[1];
    this.messages.push(this.message) // PUSH MESSAGE SEND
    if (this.message.startsWith('/join')) {
      this.chatService.joinChannel(param);
    } else if (this.message.startsWith('/nick')) {
      this.chatService.newNickname(param);
    } else {
      this.chatService.sendMessage(this.message);
    }
    newMessage.value = '';
    this.channelMessages = await this.ApiCmd.getChannelMessages(this.channelId) // GET CHANNEL MSG AFTER PUSH
  }

  async getChanMsgs(channelId) {
      this.clear(this.time)
      this.messages = null
      await this.delay(1, async () => {
        this.channelMessages = await this.ApiCmd.getChannelMessages(channelId) // GET CHANNEL MSG EVERY 3SEC
        this.channelId = channelId
      })
  }

  delay = (time, callback) => {
    this.time = setInterval(callback, time*1000)
  }

  clear = (time) => {
    clearInterval(time)
  }

  async ngOnInit() {
    this.chatService.getMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
    this.channels = await this.ApiCmd.getChannels("")
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