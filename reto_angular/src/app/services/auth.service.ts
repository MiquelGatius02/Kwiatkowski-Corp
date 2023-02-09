import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';
import { RegisterData } from '../interfaces/register-data.interface';
import { RegisterStudentsData } from '../interfaces/register-data-students.interface';
import { UserDataStudent } from '../interfaces/user-data-student.interface';
import { Component, Input } from '@angular/core'; // First, import Input
import { UserDataProf } from '../interfaces/user-data-prof.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = "http://127.0.0.1:8000/api";
  registerStudent: string = this.url + '/register_student';
  loginStudent: string = this.url + '/login_student';
  registerProfessor: string = this.url + '/register_professor';
  loginProfessor: string = this.url + '/login_professor';
  getProfessor: string = this.url + '/get_professor';
  getStudent: string = this.url + '/get_student';

  user: LoginData = { Nick: '', Password: '', Professor: -1 };
  professorRegister: RegisterData = { Nick: '', Nombre: '', Apellidos: '', Email: '', Centro: '', Password: '' };
  studentRegister: RegisterStudentsData = { Nick: '', Nombre: '', Apellidos: '', Email: '', fechaNacimiento: '', Password: '' };

  perfilStudent: UserDataStudent = { Imagen: '', Nick: '', Nombre: '', Apellidos: '', Email: '', Nacimiento: '', Password: '' }; // toni maricon
  perfilProf: UserDataProf = { Imagen: '', Nick: '', Nombre: '', Apellidos: '', Email: '', Centro: '', Password: '' };
  login: boolean = false;
  constructor(
    private http: HttpClient

  ) { }

  end_session() {
    this.login = false;
  }

  login_student(data: LoginData): Observable<LoginData> {

    return this.http.post<LoginData>(this.loginStudent, data).pipe(
      filter((value: any) => {
        if (value != undefined) {
          console.log(value);
          this.perfilStudent.Apellidos = value.data.apellidos;
          this.perfilStudent.Email = value.data.email;
          this.perfilStudent.Nacimiento = value.data.fechaNacimiento;
          this.perfilStudent.Nick = value.data.nick;
          this.perfilStudent.Nombre = value.data.nombre;
          this.perfilStudent.Password = data.Password;
          this.perfilStudent.Imagen = value.data.imagen
          this.login = true;
          return value;

        } else {
        }
      })
    );
  }

  login_professor(data: LoginData): Observable<LoginData> {

    return this.http.post<LoginData>(this.loginProfessor, data).pipe(
      filter((value: any) => {
        if (value != '') {
          console.log(value);
          this.perfilProf.Apellidos = value.data.apellidos;
          this.perfilProf.Email = value.data.email;
          this.perfilProf.Centro = value.data.centro;
          this.perfilProf.Nick = value.data.nick;
          this.perfilProf.Nombre = value.data.nombre;
          this.perfilProf.Password = data.Password;
          this.perfilProf.Imagen = value.data.imagen
          this.login = true;
          return value;
        } else {
        }
      })
    );
  }

  register_student(data: RegisterStudentsData): Observable<LoginData> {
    return this.http.post<LoginData>(this.registerStudent, data).pipe(
      filter((value: any) => {
        let found = false;
        if (value != '') {
          return value;
        } else {
          return value;
        }
      })
    );
  }

  register_professor(data: RegisterData): Observable<LoginData> {
    return this.http.post<LoginData>(this.registerProfessor, data).pipe(
      filter((value: any) => {
        let found = false;
        if (value != '') {
          return value;
        } else {
          return value;
        }
      })
    );
  }

}
