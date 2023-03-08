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
  UserData: RankData[] = [{ id: 0, rank_name: '', rank_code: 0, user_id: 0, points: 0 }]
  filteredRankingData: any[] = []
  joinData: JoinRank = { rank_id: 0 };
  rankInfo: JoinRank = { rank_id: 0 };
  joinForm: FormGroup;

  constructor(
    public authService: AuthService,
    public rankingService: RankingService,
    public fb: FormBuilder,
    public router: Router
  ) {
    this.rankingService.getRankingData()
    this.authService.profile()
    this.joinForm = this.fb.group({
      rank_id: [''],
    });
  }

  ngOnInit(): void {
    this.UserData.splice(0, this.UserData.length)
    this.UserData = this.rankingService.UserData
    console.log(this.UserData)
  }

  onSubmit() {
    this.joinData = this.joinForm.value
    this.rankingService.addRanking(this.joinData).subscribe(
      (result) => {
        console.log(result);
        window.location.reload();
      },
      () => {
        this.joinForm.reset();
        this.router.navigate(['/home/main-page']);
      }
    );
  }

  rankingData(valor: number) {
    this.rankingService.rankCode = valor
    console.log(this.rankingService.rankCode)
    this.router.navigate(['/home/ranking']);
  }
}