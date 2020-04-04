import Api from '../Api'

export default { // Hitting the end point register
  index() {
    return Api().get('channelsmessage')
  },
  get(channelId) {
    return Api().get(`channelsmessage/${channelId}`)
  },
  post(channelMessage) {
    return Api().post('channelsmessage', channelMessage)
  },
  delete(channelMessageId) {
    return Api().delete(`channelsmessage/${channelMessageId}`)
  }
}
