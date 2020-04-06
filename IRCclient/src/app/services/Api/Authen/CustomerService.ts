
import {Injectable} from '@angular/core';

const token = 'token';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    getToken() : string {
        return localStorage.getItem('token')
    }
    
    setToken(TOKEN: string): void {
        localStorage.setItem(token, TOKEN);
    }

    isLogged() {
        return localStorage.getItem(token) != null;
    }
}