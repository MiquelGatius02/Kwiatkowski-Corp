import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetitionsData } from '../interfaces/petitionsData.interface';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PetitionsService {
  
  Petitions: any;
  nombre:any

  constructor(
    private http: HttpClient,
    private token: TokenService,
  ) { }

  dataPetitions: PetitionsData[] =[];

  public getPetitions(prof_id:number) : any{  // TODAS LAS PETICIONES
      this.dataPetitions =[];
      this.http.get("http://127.0.0.1:8000/api/getPetitions"+"?"+"id_prof="+prof_id).subscribe(data => {
        this.Petitions = data;
        for (let i = 0; i < this.Petitions.data.length; i++) {
          this.http.get("http://127.0.0.1:8000/api/getUserPetitions"+"?"+"id_user="+this.Petitions.data[i].user_id).subscribe(dataUser => {
            this.nombre = dataUser;
            this.Petitions.data[i].user_id = this.nombre[0].username;
            this.dataPetitions.push(this.Petitions.data[i]);
            
          });
        }
      });  
  }

  public denegarPeticion(id:number): any{  // Denegar Peticion
    this.http.get('http://127.0.0.1:8000/api/denegarPetitions'+'?'+'id='+id).subscribe(data => {
      this.Petitions = data;
    });  
    
  }

  public aceptarPeticion(id:number,rank_id:number,user_id:number): any{  // Aceptar Peticion
    this.http.get('http://127.0.0.1:8000/api/aceptarPetitions'+'?'+'id='+id + '&rank_id='+rank_id + '&user_id='+ user_id).subscribe(data => {
      // console.log(data);      
    });  
    
  }
}  
