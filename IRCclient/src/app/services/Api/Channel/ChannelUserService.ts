import Api from '../Api'

export class ChannelUserService {

  constructor() {

  }

  public index() {
    return Api().get('channelsuser')
  }

  public get(channelId) {
    return Api().delete(`channelsuser/${channelId}`)
  }

  public post(channelUser) {
    return Api().post('channelsuser', channelUser)
  }

  public delete(channelUserId) {
    return Api().delete(`channelsuser/${channelUserId}`)
  }
}
