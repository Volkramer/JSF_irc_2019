
import {Injectable} from '@angular/core';

const token = 'token'
const user = 'user'

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    getToken() : string {
        return localStorage.getItem('token')
    }

    getUser() : Object {
        return JSON.parse(localStorage.getItem('user'))
    }

    setUser(USER: Object): void {
        localStorage.setItem(user, JSON.stringify(USER));
    }

    setToken(TOKEN: string): void {
        localStorage.setItem(token, TOKEN);
    }

    destroyCache(): void {
        localStorage.clear()
    }

    isLogged() {
        return localStorage.getItem(token) != null;
    }
}