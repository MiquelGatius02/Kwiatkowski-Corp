import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankData } from 'src/app/interfaces/rankData.interface ';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ObtenerRankingService } from 'src/app/services/obtener-ranking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  profileData: UserData = { id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "" };
  rankingData: RankData = { iduser: 0, id: 0, nombre: "", codigo_sala: "" };
  constructor(
    public authService: AuthService,
    public obtenerRankingService: ObtenerRankingService,
    public router: Router
  ) { }


  ngOnInit(): void {
    this.authService.profile();
    this.profileData = this.authService.UserData;
    this.rankingData.iduser = this.profileData.id;
    this.obtenerRankingService.getRanking(this.rankingData)
    this.rankingData = this.obtenerRankingService.rankingData;
  }

}
