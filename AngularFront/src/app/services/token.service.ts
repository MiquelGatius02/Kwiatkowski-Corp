import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class TokenService {

    private issuer = {
        login: 'http://127.0.0.1:8000/api/login'
    };
    constructor() { }
    handleData(token: any) {
        localStorage.setItem('auth_token', token);
    }
    getToken() {
        // console.log(localStorage.getItem('auth_token'))
        return localStorage.getItem('auth_token');
    }
    // Verify the token
    isValidToken() {
        /*         const token = this.getToken();
                if (token) {
                    const payload = this.payload(token);
                    if (payload) {
                        return Object.values(this.issuer).indexOf(payload.iss) > -1
                            ? true
                            : false;
                    }
                } else {
                    return false;
                } */
        if (this.getToken() != undefined) {
            return true;
        }
        else {
            return false;
        }
    }
    // User state based on valid token
    isLoggedIn() {
        return this.isValidToken();
    }
    // Remove token
    removeToken() {
        localStorage.removeItem('auth_token');
        // console.log(localStorage.getItem('auth_token'))
    }

}