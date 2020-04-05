import Api from '../Api'

export class AuthenticationService {

  constructor() {

  }

  register(credentials) {
    return Api().post('register', credentials)
  }
  
  signin(credentials) {
    return Api().post('signin', credentials)
  }
}
