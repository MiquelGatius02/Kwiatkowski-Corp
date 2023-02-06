import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerStudent: string = 'localhost:8000/api/register_student';
  loginStudent: string = 'http://127.0.0.1:8000/api/login_student';
  registerProfessor: string = 'localhost:8000/api/register_professor';
  loginProfessor: string = 'localhost:8000/api/login_professor';

  user: LoginData = { nick: '', password: '' };

  constructor(
    private http: HttpClient
  ) { }

  login(data: LoginData): Observable<LoginData> {

    return this.http.get<LoginData>(this.loginStudent).pipe(
      filter((value: any) => {
        console.log("Entro");
        let found = false;
        console.log("Hola");
        for (let i = 0; i < value.length; i++) {
          if (value[i].nick == data.nick && value[i].password == data.password) {
            found = true;
            this.user = {
              nick: value[i].nick,
              password: value[i].password,
            };
            break;
          }
        }

        return found;
      })
    );
  }

  register(data: LoginData): Observable<LoginData> {
    console.log(data);
    return this.http.post<LoginData>(this.registerStudent,data).pipe(
      filter((value: any) => {
        let found = false;
        for (let i = 0; i < value.length; i++) {
          if (value[i].nick == data.nick && value[i].password == data.password) {
            found = true;
            this.user = {
              nick: value[i].nick,
              password: value[i].password,
            };
            break;
          }
        }

        return found;
      })
    );
  }
  
}
