import Api from '../Api'

export default { // Hitting the end point register
  index(search) {
    return Api().get('channels', {
      params: {
        search: search
      }
    })
  },
  getChannel(channelId) {
    return Api().get(`channels/${channelId}`)
  },
  post(channel) {
    return Api().post(`channels`, channel)
  },
  delete(channelId) {
    return Api().delete(`channels/${channelId}`)
  },
  put(channel) {
    return Api().post('channels/${channel.id}', channel)
  }
}
