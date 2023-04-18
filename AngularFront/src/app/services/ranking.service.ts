import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { deleteUserRank } from '../interfaces/deleteUserRank';
import { Observable, tap } from 'rxjs';
import { assignmentData } from '../interfaces/assignmentData';
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
  ) { }


  // VARIABLES
  valoresDelete: deleteUserRank = { id_user: 0, id_rank: 0 };

  // CACHE .data
  _getRanking: any
  _getRankingDataByCode: any;
  _getRankingDataByUser: any;
  _getUser: any;
  _getSkills: any;
  rankCache: RankData = { id: 0, rank_name: "", rank_description: "", id_creador: 0 }
  rankCache2: assignmentData = { id: 0, assignment_name: "", rank_code: 0, prof_id: 0 }


  // ARRAYS VALORES RECUPERADOS

  _data1: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]
  _data2: RankData[] = [{ id: 0, rank_name: "", rank_description: "", id_creador: 0 }]
  _data3: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]
  _data4: UserData[] = [{
    id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "",
    Nivel_autonomia_e_iniciativa: 0, Nivel_cooperacion: 0, Nivel_gestion_emocional: 0, Nivel_habilidades_de_pensamiento: 0, Nivel_responsabilidad: 0, puntos_skill: 0, skills: []
  }];
  Skills: UserData[] = [];


  public createRaking(rank: RankData) {
    const tokenCache: any = this.token.getToken();
    return this.http.post("http://127.0.0.1:8000/api/createRanking", rank, { headers: new HttpHeaders().set('Authorization', tokenCache) })
  }

  public getRanking() {  // TODOS LOS RANKINGS
    const tokenCache: any = this.token.getToken();
    this.http.get("http://127.0.0.1:8000/api/getRanking").subscribe(data => {
      if (this._getRanking != undefined) {
        this._getRanking = []
      }
      this._getRanking = data;
      for (let i = 0; i < this._getRanking.data.length; i++) {
        this._data2.push(this._getRanking.data[i])
      }

    });
  }
  public getRankingDataByCode(rank_code: number) { // RECUPRAR DATOS RANKING POR ID DE RANKING
    // console.log(rank_code)
    this.http.get("http://127.0.0.1:8000/api/getRankingDataByCode" + "?" + "rank_code=" + rank_code).subscribe(data => {
      this._getRankingDataByCode = data
      this._data3 = []
      for (let i = 0; i < this._getRankingDataByCode.data.length; i++) {
        this._data3.push(this._getRankingDataByCode.data[i])
      }
    });
  }

  public getRankingDataByUser(user_id: number) { // RECUPERAR DATOS RANKING POR ID DE USUARIO
    this.http.get("http://127.0.0.1:8000/api/getRankingDataByUser" + "?" + "user_id=" + user_id).subscribe(data => {
      this._getRankingDataByUser = data
      for (let i = 0; i < this._getRankingDataByUser.data.length; i++) {
        this._data1.push(this._getRankingDataByUser.data[i])
      }
    });

  }

  public getUser() { // RECUPERAR TODOS LOS USUARIOS
    this._data4 = [];
    this._getUser = [];

    const tokenCache: any = this.token.getToken();
    this.http.get("http://127.0.0.1:8000/api/getUser").subscribe(data => {
      // console.log(data);
      this._getUser = data;
      this.Skills = this._getUser.skills;
      for (let i = 0; i < this._getUser.data.length; i++) {
        this._data4.push(this._getUser.data[i]);
      }
      console.log(this._data4);
    });
  }

  addRanking(rank: JoinRank) {
    // console.log(rank);
    this.http.post('http://127.0.0.1:8000/api/addRanking', rank).subscribe(data => {
      // console.log(data)
    });

  }

  deleteUser(user_id: number, id_rank: number) {
    this.valoresDelete.id_user = user_id;
    this.valoresDelete.id_rank = id_rank;
    this.http.post('http://127.0.0.1:8000/api/deleteUser', this.valoresDelete).subscribe(data => {
      // console.log(data);
    });
  }

  deleteRanking(rank: RankData) {
    console.log(rank);
    this.http.post('http://127.0.0.1:8000/api/deleteRanking', rank).subscribe(data => {
      // console.log(data);
    });
  }

  regenerarCodigo(rank: RankData, codeNuevo: number) {
    rank.id_creador = codeNuevo;
    console.log(codeNuevo);
    this.http.post('http://127.0.0.1:8000/api/regenerarCodigo', rank).subscribe(data => {
      console.log(data);
    });
  }

} 
