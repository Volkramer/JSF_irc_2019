import Api from '../Api'

export class UserService {

  constructor() {

  }

  public index(search) {
    return Api().get('users', {
      params: {
        search: search
      }
    })
  }

  public getUser(userId) {
    return Api().get(`users/${userId}`)
  }

  public post(user) {
    return Api().post('users', user)
  }

  public delete(userId) {
    return Api().delete(`users/${userId}`)
  }
  
  public put(user) {
    return Api().put(`users/${user.id}`, user)
  }
}
