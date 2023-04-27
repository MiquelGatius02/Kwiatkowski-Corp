import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { evaluationData } from '../interfaces/evaluationData.interface';
import { evaluationDelete } from '../interfaces/evaluationDelete';
import { UserData } from '../interfaces/userData.interface';
import { RankingService } from './ranking.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  _data1: evaluationData[] = [{ id: 0, ranking_id: 0, evaluador: 0, evaluado: 0, points: 0, soft_skill: 0, date: 0 }];
  _getEvaluation: any;
  _resultadoEvaluar: any;
  resultadoEvaluar: any;
  
  EvaluationDisplay: any[] = [{ id: 0, ranking_id: 0, evaluador: 0, evaluado: 0, points: 0, soft_skill: 0, date: 0 }]
  User: UserData[] = [{
    id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "",
    Nivel_autonomia_e_iniciativa: 0, Nivel_cooperacion: 0, Nivel_gestion_emocional: 0, Nivel_habilidades_de_pensamiento: 0, Nivel_responsabilidad: 0, puntos_skill: 0
  }];
  datosDelete: evaluationDelete = { id: 0, puntos: 0, soft_skill: 0 }

  constructor(
    private http: HttpClient,
    private token: TokenService,
    public rankingService: RankingService
  ) { }

  public createEvaluation(evaluation: evaluationData) {
    const tokenCache: any = this.token.getToken();
    return this.http.post("http://127.0.0.1:8000/api/createEvaluation", evaluation, { headers: new HttpHeaders().set('Authorization', tokenCache) })
  }

  public getEvaluation() {
    this._data1 = [];
    this.rankingService.getUser()
    const tokenCache: any = this.token.getToken();
    this.http.get("http://127.0.0.1:8000/api/getEvaluation").subscribe(data => {
      this._getEvaluation = data;
      for (let i = 0; i < this._getEvaluation.data.length; i++) {
        this._data1.push(this._getEvaluation.data[i])
      }
      console.log(this._data1)
      this.renombrarNombresEvaluacion();
    });
  }

  public evaluar(evaluation: any) {
    const tokenCache: any = this.token.getToken();

    this.http.post("http://127.0.0.1:8000/api/Evaluate", evaluation, { headers: new HttpHeaders().set('Authorization', tokenCache) }).subscribe(data => {
      this._resultadoEvaluar = data;
    })
  }

  renombrarNombresEvaluacion() {

    console.log(this._data1.length)
    console.log(this.rankingService._data4.length)
    for (let i = 0; i < this._data1.length; i++) {
      this.EvaluationDisplay.push(this._data1[i]);
      for (let j = 0; j < this.rankingService._data4.length; j++) {

        if (this.rankingService._data4[j].id == this.EvaluationDisplay[i].evaluador) {
          this.EvaluationDisplay[i].evaluador = this.rankingService._data4[i].username;
        }
        if (this.rankingService._data4[j].id == this.EvaluationDisplay[i].evaluado) {
          this.EvaluationDisplay[i].evaluado = this.rankingService._data4[i].username;
        }

      }
    }
    this.EvaluationDisplay.splice(0, 1)
    console.log(this.EvaluationDisplay)

  }
  deleteUser(id: number, soft_skill: number, puntos: number) {

    this.datosDelete.id = id;
    this.datosDelete.soft_skill = soft_skill;
    this.datosDelete.puntos = puntos;
    this.http.post('http://127.0.0.1:8000/api/deleteEvaluation', this.datosDelete).subscribe(data => {
      console.log(data)
    });
  }
}

