import Api from '../Api'

export default { // Hitting the end point register
  index() {
    return Api().get('messagesuser')
  },
  get(userId) {
    return Api().delete(`messagesuser/${userId}`)
  },
  post(messageUser) {
    return Api().post('messagesuser', messageUser)
  },
  delete(messageUserId) {
    return Api().delete(`messagesuser/${messageUserId}`)
  }
}
