import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { JoinRank } from '../interfaces/joinRank.interface';
import { RankData } from '../interfaces/rankData.interface ';
import { RankingUserData } from '../interfaces/rankingUserData.interface';
import { UserData } from '../interfaces/userData.interface';
import { AuthStateService } from './auth-state.service';
import { AuthService } from './auth.service';
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
    private authState: AuthStateService,
  ) { }


  cache: any;
  _getRanking: any
  _getRankingDataByCode: any;
  _getRankingDataByUser: any;
  _data1: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]
  _data2: RankData[] = [{ id: 0, rank_name: "", rank_description: "" }]
  Data3: any;
  rankCode: number = 0;
  nombreUser: any;
  contador: number = 0;

  public getRanking() {
    const tokenCache: any = this.token.getToken();
    this.http.get("http://127.0.0.1:8000/api/getRanking").subscribe(data => {
      console.log(data)
      this._getRanking = data;
      for (let i = 0; i < this._getRanking.data.length; i++) {
        this._data2.push(this._getRanking.data[i])
      }
    });
  }
  public getRankingDataByCode(rank_code: number) {
    this.http.get("http://127.0.0.1:8000/api/getRankingDataByCode" + "?" + "rank_code=" + rank_code).subscribe(data => {
      /*    console.log(data) */
      this._getRankingDataByCode = data
      console.log(this._getRankingDataByCode.data)
    });
  }

  public getRankingDataByUser(user_id: number) {
    this.http.get("http://127.0.0.1:8000/api/getRankingDataByUser" + "?" + "user_id=" + user_id).subscribe(data => {
      console.log(data)
      this._getRankingDataByUser = data
      for (let i = 0; i < this._getRankingDataByUser.data.length; i++) {
        this._data1.push(this._getRankingDataByUser.data[i])
      }
    });

  }

} 
