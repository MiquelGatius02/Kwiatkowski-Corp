import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cat } from '../models/cat.model';



@Injectable({
  providedIn: 'root'
})
export class CatService {

  readonly baseUrl = 'https://api.thecatapi.com/v1/images/search/';
  readonly apiKey = 'api_key=live_Gj8ve36eVrXLVcr5Ptxz6qaTR4ZzV1cNkW3b1itwUekycEKB9ZKEjdH3MBEuZRU3';

  constructor(private http: HttpClient) {}

  getCats(amount?: string|null) {
    let url: string = this.baseUrl

    if(amount) {
      url += '?' + this.apiKey + '&limit=' + amount;
    }
    
    return this.http.get<Cat[]>(url);
  }
}
