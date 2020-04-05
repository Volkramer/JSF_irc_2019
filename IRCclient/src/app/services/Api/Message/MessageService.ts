import Api from '../Api'

export class MessageService {

  constructor() {

  }

  public index(search) {
    return Api().get('messages', {
      params: {
        search: search
      }
    })
  }

  public getMessage(messageId) {
    return Api().get(`messages/${messageId}`)
  }

  public post(message) {
    return Api().post(`messages`, message)
  }

  public delete(messageId) {
    return Api().delete(`messages/${messageId}`)
  }

  public put(message) {
    return Api().put(`message/${message.id}`, message)
  }
}
