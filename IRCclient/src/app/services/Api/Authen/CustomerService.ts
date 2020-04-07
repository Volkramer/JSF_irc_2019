
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

    destroyCache(): void {
        localStorage.clear()
    }

    isLogged() {
        return localStorage.getItem(token) != null;
    }
}