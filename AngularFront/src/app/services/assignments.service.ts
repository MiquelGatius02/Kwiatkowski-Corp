import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { assignmentData } from '../interfaces/assignmentData';
import { RankingService } from './ranking.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(
    private http: HttpClient,
    public router: Router,
    public fb: FormBuilder,
    private token: TokenService,
    public rankingService: RankingService,
  ) { }

  public createRaking(rank: assignmentData) {
    const tokenCache: any = this.token.getToken();
    return this.http.post("http://127.0.0.1:8000/api/createRanking", rank, { headers: new HttpHeaders().set('Authorization', tokenCache) })
  }
}

