import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { assignmentData } from '../interfaces/assignmentData';
import { assignmentData_info } from '../interfaces/assignmentData_info';
import { RankingUserData } from '../interfaces/rankingUserData.interface';
import { setPoints } from '../interfaces/setPoints';
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

  _getRanking: any
  _getAssignment: any
  _getAssignmentUser: any
  _data1: assignmentData[] = [{ id: 0, assignment_name: "", rank_code: 0, prof_id: 0 }]
  _data2: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]

  public createAssignment(rank: assignmentData) {
    const tokenCache: any = this.token.getToken();
    return this.http.post("http://127.0.0.1:8000/api/createAssignment", rank, { headers: new HttpHeaders().set('Authorization', tokenCache) })
  }

  public createAssignmentData(rank: assignmentData_info) {
    const tokenCache: any = this.token.getToken();
    return this.http.post("http://127.0.0.1:8000/api/createAssignmentData", rank, { headers: new HttpHeaders().set('Authorization', tokenCache) })
  }

  public delAssignment(data: assignmentData) {
    return this.http.post("http://127.0.0.1:8000/api/delAssignment", data)
  }

  public getAssignment() {  // TODOS LOS ASSIGNMENTS
    const tokenCache: any = this.token.getToken();
    this.http.get("http://127.0.0.1:8000/api/getAssignment").subscribe(data => {
      if (this._getAssignment != undefined) {
        this._getAssignment = this._getAssignment.splice(0, this._getAssignment.length)
      }
      this._getAssignment = data;
      for (let i = 0; i < this._getAssignment.data.length; i++) {
        this._data1.push(this._getAssignment.data[i])
      }
    });
  }

  public changePoints(rank: setPoints) {
    console.log(rank)
    return this.http.post("http://127.0.0.1:8000/api/setPoints", rank).subscribe(data => {
      console.log(data)
    })
  }
}

