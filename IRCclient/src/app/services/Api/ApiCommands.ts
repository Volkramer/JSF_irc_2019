///////////////////////////////////////////////////////////////////////////////////
/*SERVICES*/
import { ChannelMessageService } from '../../services/Api/Channel/ChannelMessageService';
import { ChannelService } from '../../services/Api/Channel/ChannelService';
import { ChannelUserService } from '../../services/Api/Channel/ChannelUserService';
import { MessageService } from '../../services/Api/Message/MessageService';
import { MessageUserService } from '../../services/Api/Message/MessageUserService';
import { UserService } from '../../services/Api/User/UserService';
///////////////////////////////////////////////////////////////////////////////////

export class ApiCommands {
  private ChanService = new ChannelService();
  private ChanMsgService = new ChannelMessageService();
  private ChanUserService = new ChannelUserService();
  private MessageService = new MessageService();
  private MessageUserService = new MessageUserService();
  private UsrService = new UserService();
  data: Object;

  constructor(private object: Object) {
    this.data = object;
  }
  ///////////////////////////////////////////////////////////////////////////////////
  /*Channels*/
  async getChannels(data) {
    let resp = await this.ChanService.index(data);
    return resp.data;
  }
  ///////////////////////////////////////////////////////////////////////////////////
  /*Users*/
  async getUsers(data) {
    let resp = await this.UsrService.index(data);
    return resp.data;
  }
  ///////////////////////////////////////////////////////////////////////////////////
  /*ChannelsUsers*/

  async getChannelsUsers() {
    let resp = await this.ChanUserService.index();
    return resp.data;
  }
  ///////////////////////////////////////////////////////////////////////////////////
  /*ChannelsUsers*/

  async getUserChannels(userId) {
    let resp = await this.ChanUserService.getUserChannels(userId);
    return resp.data;
  }
  ///////////////////////////////////////////////////////////////////////////////////
  /*ChannelsMessages*/
  async getChannelsMessages() {
    let resp = await this.ChanMsgService.index();
    return resp.data;
  }
  async getChannelMessages(channelId) {
    let resp = await this.ChanMsgService.get(channelId);
    return resp.data;
  }
  ///////////////////////////////////////////////////////////////////////////////////
  /*MessagesUsers*/
  async getMessagesUsers() {
    let resp = await this.MessageUserService.index();
    return resp.data;
  }
  ///////////////////////////////////////////////////////////////////////////////////
  /*Messages*/
  async getMessages(search) {
    let resp = await this.MessageService.index(search);
    return resp.data;
  }
  ///////////////////////////////////////////////////////////////////////////////////
}
