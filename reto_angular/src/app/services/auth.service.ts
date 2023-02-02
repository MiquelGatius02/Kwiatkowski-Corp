import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fakeUrl: string = 'assets/serverFake.json';
  user: LoginData = { nick: '', password: '' };

  constructor(
    private http: HttpClient
  ) { }

  login(data: LoginData): Observable<LoginData> {

    return this.http.get<LoginData>(this.fakeUrl).pipe(
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

  register(data: LoginData): Observable<LoginData> {
    console.log(data);
    return this.http.get<LoginData>(this.fakeUrl).pipe(
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
