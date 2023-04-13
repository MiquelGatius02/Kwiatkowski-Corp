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
  RankingData: RankData[] = [{ id: 0, rank_name: "", rank_description: "", id_creador: 0 }]
  UsersRankingData: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]
  User: UserData[] = [{ id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "", 
  Nivel_autonomia_e_iniciativa:0,Nivel_cooperación:0,Nivel_gestion_emocional:0,Nivel_habilidades_de_pensamiento:0,Nivel_responsabilidad:0,puntos_skill:0 }];

  showAlertDelete: boolean = false;

  constructor(
    public authService: AuthService,
    public rankingService: RankingService,
    public fb: FormBuilder,
    public router: Router
  ) {
  }


  ngOnInit(): void {
    this.UsersRankingData = [];
    this.RankingData = [];
    this.User = [];

    this.RankingData = this.rankingService._data2
    this.rankingService.getRankingDataByCode(this.rankingService.rankCache.id)
    this.UsersRankingData = this.rankingService._data3;
    this.rankingService.getUser();
    this.User = this.rankingService._data4;
    // this.User = this.rankingService.Skills;
    console.log(this.User);
  }

  eliminarUsuario(usuario: number, id_rank: number) {
    if (confirm("¿Seguro desea borrar este usuario?")) {
      this.rankingService.deleteUser(usuario, id_rank);
      if (this.showAlertDelete == false) {
        this.showAlertDelete = true;
        setTimeout(() => {
          this.showAlertDelete = false;
        }, 2000);
      } else {
        this.showAlertDelete = false;
      }
    }
  }

}
