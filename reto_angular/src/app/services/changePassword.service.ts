import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';
import { RegisterData } from '../interfaces/register-data.interface';
import { RegisterStudentsData } from '../interfaces/register-data-students.interface';
import { UserDataStudent } from '../interfaces/user-data-student.interface';
import { Component, Input } from '@angular/core'; // First, import Input
import { UserDataProf } from '../interfaces/user-data-prof.interface';
import { Router } from '@angular/router';
import { ChangePasswordData } from '../interfaces/changePass.interface';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PasswordService {
    url: string = "http://127.0.0.1:8000/api";
    changePasswordProfessor: string = this.url + '/updatePasswordProf';
    changePasswordStudent: string = this.url + '/updatePasswordStud';
    requestPassword: any[] = [];

    user: LoginData = { Nick: '', Password: ''};
    data: ChangePasswordData = { Nick: '', Password: '' };
    login: boolean = false;
    constructor(
        private http: HttpClient,
        private readonly router: Router,
        private readonly authService: AuthService
    ) { }

    changePasswordProf(data: ChangePasswordData) {
        this.data.Nick = data.Nick;
        this.data.Password = data.Password;
        console.log(data)
        return this.http.post(this.changePasswordProfessor, data);
    }

    changePasswordStud(data: ChangePasswordData) {
        this.data.Nick = data.Nick;
        this.data.Password = data.Password;
        console.log(data)
        return this.http.post(this.changePasswordStudent, data);
    }
}