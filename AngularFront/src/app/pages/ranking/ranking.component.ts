import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RankData } from 'src/app/interfaces/rankData.interface ';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  UserData: RankData[] = [{ id: 0, rank_name: '', rank_code: 0, user_id: 0, points: 0 }]
  RankingName: string[] = [];
  arrayFinal: RankData[] = [{ id: 0, rank_name: '', rank_code: 0, user_id: 0, points: 0 }]
  nombreUser: any;
  seguir: boolean
  constructor(
    public authService: AuthService,
    public rankingService: RankingService,
    public fb: FormBuilder,
    public router: Router
  ) {
    this.seguir = true;
  }

  change() {
    if (this.seguir == false) {
      this.seguir = true;
    }
    else {
      this.seguir = false;
    }
  }

  ngOnInit(): void {
    this.UserData.splice(0, this.UserData.length)
    this.rankingService.getRankingDataAll()
    this.UserData = this.rankingService.AllUserData
    console.log(this.UserData)
    this.rankingService.getUser()
    this.nombreUser = this.rankingService.nombreUser;
    console.log(this.nombreUser)
  }

  ngAfterInit() {
    setTimeout(() => {
      this.UserData.sort((a, b) => (a.points < b.points) ? -1 : 1)
    }, 100);

  }
}
