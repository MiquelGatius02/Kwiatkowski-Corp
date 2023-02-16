import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../interfaces/userData.interface';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TokenService } from './token.service';
import { AuthStateService } from './auth-state.service';
// User interface

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    typeUser: number = 0;
    public loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1);

    changeType(type: number) {
        this.typeUser = type;
    }

    constructor(private http: HttpClient,
        public router: Router,
        public fb: FormBuilder,
        private token: TokenService,
        private authState: AuthStateService) { }
    // User registration
    registerProfessor(user: UserData): Observable<any> {
        return this.http.post('http://127.0.0.1:8000/api/registerProfessor', user);
    }
    registerStudent(user: UserData): Observable<any> {
        return this.http.post('http://127.0.0.1:8000/api/registerStudent', user);
    }
    // Login
    signin(user: UserData): Observable<any> {
        return this.http.post<any>('http://127.0.0.1:8000/api/login', user).pipe(
            tap(() => this.loggedIn.next(true)
            ));
    }

    logout() { // ACABAR!!
        return this.http.get<any>('http://127.0.0.1:8000/api/login').pipe(
            tap(() => this.loggedIn.next(false)));
    }

    loginStatusChange(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }
    // Access user profile
    profileUser(): Observable<any> {
        return this.http.get('http://127.0.0.1:8000/api/auth/user-profile');
    }
}