import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { JoinRank } from '../interfaces/joinRank.interface';
import { RankData } from '../interfaces/rankData.interface ';
import { RankingUserData } from '../interfaces/rankingUserData.interface';
import { UserData } from '../interfaces/userData.interface';
import { AuthStateService } from './auth-state.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  loggedIn: any;


  constructor(
    private http: HttpClient,
    public router: Router,
    public fb: FormBuilder,
    private token: TokenService,
    private authState: AuthStateService
  ) { }

  UserData: RankData[] = []
  AllUserData: RankData[] = []

  Data: any;
  Data2: any;
  Data3: any;
  rankCode: number = 0;
  nombreUser: any;


  getRankingData() {
    const tokenCache: any = this.token.getToken();
    this.http.get("http://127.0.0.1:8000/api/getRankingData", { headers: new HttpHeaders().set('Authorization', tokenCache) }).subscribe(data => {
      console.log(data);
      this.Data = data;
      console.log(this.Data)
      this.UserData.splice(0, this.UserData.length)
      for (let i = 0; i < this.Data.data.length; i++) {
        this.UserData.push(this.Data.data[i]);
      }
      console.log(this.UserData)
    });
  }
  addRanking(rank: JoinRank): Observable<any> {
    const tokenCache: any = this.token.getToken();
    console.log("Añadiendo ranking...")
    return this.http.post('http://127.0.0.1:8000/api/addRanking', rank, { headers: new HttpHeaders().set('Authorization', tokenCache) })
  }
  getRankingDataAll() {
    const tokenCache: any = this.token.getToken();
    this.http.get("http://127.0.0.1:8000/api/infoRanking", { headers: new HttpHeaders().set('Authorization', tokenCache) }).subscribe(data => {
      console.log(data);
      this.Data2 = data;
      console.log(this.Data2)
      this.AllUserData.splice(0, this.AllUserData.length)
      for (let i = 0; i < this.Data2.data.length; i++) {
        this.AllUserData.push(this.Data2.data[i]);
      }
      console.log(this.AllUserData)
    });
  }

  getUser() {
    this.http.get("http://127.0.0.1:8000/api/getUser").subscribe(data => {
      this.Data3 = data;
      this.nombreUser = this.Data3

    });
  }
}
