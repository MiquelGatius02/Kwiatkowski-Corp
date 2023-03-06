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
  UserData: RankData[] = []

  constructor(
    private http: HttpClient,
    public router: Router,
    public fb: FormBuilder,
    private token: TokenService,
    private authState: AuthStateService
  ) { }

  Data: any;

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
}
