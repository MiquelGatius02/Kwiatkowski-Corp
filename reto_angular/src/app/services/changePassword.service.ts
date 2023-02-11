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

@Injectable({
    providedIn: 'root'
})
export class PasswordService {
    url: string = "http://127.0.0.1:8000/api";
    registerStudent: string = this.url + '/register_student';
    loginStudent: string = this.url + '/login_student';
    registerProfessor: string = this.url + '/register_professor';
    loginProfessor: string = this.url + '/login_professor';
    getProfessor: string = this.url + '/get_professor';
    getStudent: string = this.url + '/get_student';
    changePasswordProfessor: string = this.url + '/updatePasswordProf';
    changePasswordStudent: string = this.url + '/updatePasswordStud';

    user: LoginData = { Nick: '', Password: '', Professor: -1 };

    login: boolean = false;
    constructor(
        private http: HttpClient,
        private readonly router: Router
    ) { }


    changePasswordProf(id: number, newPassword: string) {
        //      this.http.post(this.changePasswordProfessor, id, newPassword);
    }

    changePasswordStud(id: number, newPassword: string) {
        //        this.http.post(this.changePasswordProfessor, id, newPassword);
    }
}

/* ████╗░░░████████████╗
████║░░░████████████║
████║░░░████╔═══════╝
████║░░░████║░░░░░░░░
████████████████████╗
████████████████████║
╚═══════████╔═══████║
░░░░░░░░████║░░░████║
████████████║░░░████║
████████████║░░░████║
╚═══════════╝░░░╚═══╝ */