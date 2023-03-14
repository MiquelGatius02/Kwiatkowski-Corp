import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetitionsService {
  loggedIn: any;

  constructor(
    private http: HttpClient,
  ) { }

  public getPetitions(prof_id:number):any {  // TODAS LAS PETICIONES

    return this.http.get("http://127.0.0.1:8000/api/getPetitions"+"?"+"id_prof="+prof_id);
  }
} 
