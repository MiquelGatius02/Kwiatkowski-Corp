import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetitionsData } from '../interfaces/petitionsData.interface';

@Injectable({
  providedIn: 'root'
})
export class PetitionsService {
  
  Petitions: any;
  nombre:any

  constructor(
    private http: HttpClient,
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

  public denegarPeticion(id:number): Observable<any>{  // Dengar Peticion
    
    return this.http.post('http://127.0.0.1:8000/api/denegarPetitions',id);
    
  }
}  
