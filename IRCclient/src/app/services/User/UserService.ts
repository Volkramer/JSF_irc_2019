import Api from '../Api'

export default {
  index(search) {
    return Api().get('users', {
      params: {
        search: search
      }
    })
  },
  getUser(userId) {
    return Api().get(`users/${userId}`)
  },
  post(user) {
    return Api().post('users', user)
  },
  delete(userId) {
    return Api().delete(`users/${userId}`)
  },
  put(user) {
    return Api().put(`users/${user.id}`, user)
  }
}
