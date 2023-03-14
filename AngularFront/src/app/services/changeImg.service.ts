import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from '../interfaces/userData.interface';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { imgData } from '../interfaces/imgData.interface';
// User interface

@Injectable({
    providedIn: 'root',
})
export class changeImgService {

    constructor(private http: HttpClient,
        public router: Router,
        public fb: FormBuilder) { }

    changeImg(user: imgData): Observable<any> {
         (user);
        return this.http.post('http://127.0.0.1:8000/api/changeImg', user);
    }

}
