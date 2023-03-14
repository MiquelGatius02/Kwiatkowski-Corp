import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createRank } from 'src/app/interfaces/createRankingData';
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
  noLoop: boolean = true;

  joinData: JoinRank = { rank_code: 0, user_logged: 0};

  crearData: RankData = { id: 0, rank_name: "", rank_description: "" };
  joinForm: FormGroup;
  createForm: FormGroup;

  constructor(
    public authService: AuthService,
    public rankingService: RankingService,
    public fb: FormBuilder,
    public router: Router
  ) {
    this.authService.profile()
    this.joinForm = this.fb.group({

      rank_id: '',

    });

    this.createForm = this.fb.group({
      id: [''],
      rank_name: ['', Validators.required],
      rank_description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.UserRankingData = this.UserRankingData.splice(0, this.UserRankingData.length)
    this.RankingData = this.RankingData.splice(0, this.RankingData.length)
    this.authService.profile()
    this.rankingService.getRanking()
    this.UserRankingData = this.rankingService._data1
    this.RankingData = this.rankingService._data2
  }

  clickRanking(rank: RankData) {
    this.rankingService.rankCache = rank
    this.router.navigate(['/home/ranking']);
  }

  onSubmit() {

    this.joinData = this.joinForm.value;
    this.joinData.user_logged = this.authService.UserData.id;
    this.rankingService.addRanking(this.joinData).subscribe(
      (result) => {
        // console.log(result);

        window.location.reload();
      },
      () => {
        this.joinForm.reset();
        this.router.navigate(['/home/main-page']);
      }
    );
  }

  createRanking() {
    this.crearData = this.createForm.value;
    const rank_code = this.generateRankCode();
    this.crearData.id = rank_code
    this.rankingService.createRaking(this.crearData).subscribe(
      (result) => {
        // console.log(result);

        window.location.reload();
      },
      () => {
        this.joinForm.reset();
        this.router.navigate(['/home/main-page']);
      }
    );
  }

  generateRankCode(): number {
    // Generar código aleatorio de 5 dígitos
    const code = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    return code;
  }
}

