import Api from '../Api'

export default { // Hitting the end point register
  index() {
    return Api().get('channelsuser')
  },
  get(channelId) {
    return Api().delete(`channelsuser/${channelId}`)
  },
  post(channelUser) {
    return Api().post('channelsuser', channelUser)
  },
  delete(channelUserId) {
    return Api().delete(`channelsuser/${channelUserId}`)
  }
}
