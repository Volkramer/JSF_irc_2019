import Api from '../Api'

export class ChannelService {
  
  constructor() {

  }

  public index(search) {
    return Api().get('channels', {
      params: {
        search: search
      }
    })
  }

  public getChannel(channelId) {
    return Api().get(`channels/${channelId}`)
  }

  public post(channel) {
    return Api().post(`channels`, channel)
  }

  public delete(channelId) {
    return Api().delete(`channels/${channelId}`)
  }

  public put(channel) {
    return Api().post('channels/${channel.id}', channel)
  }
}
