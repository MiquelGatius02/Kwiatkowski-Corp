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

<<<<<<< Updated upstream
=======
  ngOnInit(): void {
    this.UserData.splice(0, this.UserData.length)
    this.UserData = this.rankingService.UserData
    // console.log(this.UserData);
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
>>>>>>> Stashed changes

  ngOnInit(): void {
    this.authService.profile();
    this.profileData = this.authService.UserData;
    this.rankingData.iduser = this.profileData.id;
    console.log(this.rankingData.iduser)
    this.obtenerRankingService.getRanking()
    this.rankingData = this.obtenerRankingService.rankingData;
  }

}
