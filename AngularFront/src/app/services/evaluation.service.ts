import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { evaluationData } from '../interfaces/evaluationData.interface';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  _data1: evaluationData[] = [{ id: 0, ranking_id: 0, evaluador: 0, evaluado: 0, points: 0, soft_skill: 0, date: 0 }];
  _getEvaluation: any
  constructor(
    private http: HttpClient,
    private token: TokenService,
  ) { }

  public createEvaluation(evaluation: evaluationData) {
    const tokenCache: any = this.token.getToken();
    return this.http.post("http://127.0.0.1:8000/api/createEvaluation", evaluation, { headers: new HttpHeaders().set('Authorization', tokenCache) })
  }

  public getEvaluation() {
    this._data1 = [];
    this._getEvaluation = [];
    const tokenCache: any = this.token.getToken();
    this.http.get("http://127.0.0.1:8000/api/getEvaluation").subscribe(data => {
      this._getEvaluation = data;
      for (let i = 0; i < this._getEvaluation.data.length; i++) {
        this._data1.push(this._getEvaluation.data[i])
      }
    });
  }

  public evaluar(evaluation: any) {

    const tokenCache: any = this.token.getToken();
    this.http.post("http://127.0.0.1:8000/api/Evaluate", evaluation/* , { headers: new HttpHeaders().set('Authorization', tokenCache) } */).subscribe(data => {
      console.log(data)
    })
  }
}

