import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RankData } from '../interfaces/rankData.interface ';

@Injectable({
  providedIn: 'root'
})
export class ObtenerRankingService {

  typeUser: number = 0;
  Data: any[] = [];
  rankingData: any[] = [];
  finalData: RankData[] = []

  constructor(private http: HttpClient, public router: Router) { }

  getRanking() {
    this.http.get("http://127.0.0.1:8000/api/getRanking").subscribe(data => {
      this.Data.push(data)
      this.rankingData.push(this.Data[0].data)
      for (let i = 0; i < this.rankingData[0].length; i++) {
        this.finalData[i] = this.rankingData[0][i];
      }
      console.log(this.finalData)
    });
  }
}
