import Api from '../Api'

export class MessageUserService {
  
  constructor() {

  }

  public index() {
    return Api().get('messagesuser')
  }

  public get(userId) {
    return Api().delete(`messagesuser/${userId}`)
  }

  public post(messageUser) {
    return Api().post('messagesuser', messageUser)
  }

  public delete(messageUserId) {
    return Api().delete(`messagesuser/${messageUserId}`)
  }
}
