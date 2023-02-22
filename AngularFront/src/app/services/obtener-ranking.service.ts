import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rankData } from '../interfaces/rankData.interface ';

@Injectable({
  providedIn: 'root'
})
export class ObtenerRankingService {

  typeUser: number = 0;
  Data: any;
  RankData: rankData = { nombre: '', codigoSala: 0, idUser: ''};

  constructor(private http: HttpClient){}
  
  getRanking() {
      this.http.get("http://127.0.0.1:8000/api/getRanking").subscribe(data => {
          this.RankData.nombre = this.Data.nombre;
          this.RankData.codigoSala = this.Data.codigoSala;
          this.RankData.idUser = this.Data.idUser;
      });
  }
}
