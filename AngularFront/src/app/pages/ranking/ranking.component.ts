import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RankData } from 'src/app/interfaces/rankData.interface ';
import { RankingUserData } from 'src/app/interfaces/rankingUserData.interface';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  RankingData: RankData[] = [{ id: 0, rank_name: "", rank_description: "" }]
  UsersRankingData: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]
  User: UserData[] = [{ id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "" }];

  constructor(
    public authService: AuthService,
    public rankingService: RankingService,
    public fb: FormBuilder,
    public router: Router
  ) {
  }


  ngOnInit(): void {
    this.UsersRankingData = []
    this.RankingData = []
    this.User = []
    this.RankingData = this.rankingService._data2
    this.rankingService.getRankingDataByCode(this.rankingService.rankCache.id)
    this.UsersRankingData = this.rankingService._data3;
    this.rankingService.getUser();
    this.User = this.rankingService._data4;
  }


}
