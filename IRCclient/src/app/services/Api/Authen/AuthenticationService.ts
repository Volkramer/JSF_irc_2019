import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Api from '../Api'
export class AuthenticationService {

  constructor() {

  }

  getToken() : string {
    return localStorage.getItem('token')
  }

  register(credentials) {
    return Api().post('register', credentials)
  }
  
  signin(credentials) {
    return Api().post('signin', credentials)
  }
}
