import Api from '../Api'

export default { // Hitting the end point register
  index(search) {
    return Api().get('messages', {
      params: {
        search: search
      }
    })
  },
  getMessage(messageId) {
    return Api().get(`messages/${messageId}`)
  },
  post(message) {
    return Api().post(`messages`, message)
  },
  delete(messageId) {
    return Api().delete(`messages/${messageId}`)
  },
  put(message) {
    return Api().put(`message/${message.id}`, message)
  },
}
