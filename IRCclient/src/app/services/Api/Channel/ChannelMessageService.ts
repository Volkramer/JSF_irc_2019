import Api from '../Api'

export class ChannelMessageService {
  
  constructor () {

  }

  public index() {
    return Api().get('channelsmessage')
  }

  public get(channelId) {
    return Api().get(`channelsmessage/${channelId}`)
  }

  public post(channelMessage) {
    return Api().post('channelsmessage', channelMessage)
  }

  public delete(channelMessageId) {
    return Api().delete(`channelsmessage/${channelMessageId}`)
  }
}
