import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JoinRank } from 'src/app/interfaces/joinRank.interface';
import { RankData } from 'src/app/interfaces/rankData.interface ';
import { RankingUserData } from 'src/app/interfaces/rankingUserData.interface';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  profileData: UserData = { id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "", imagen: "" };
  UserRankingData: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]
  RankingData: RankData[] = [{ id: 0, rank_name: "", rank_description: "" }]
  constructor(
    public authService: AuthService,
    public rankingService: RankingService,
    public fb: FormBuilder,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.profile()
    this.rankingService.getRanking()
    this.UserRankingData = this.UserRankingData.splice(0, this.UserRankingData.length)
    this.UserRankingData = this.rankingService._data1
    this.RankingData = this.rankingService._data2
  }

}