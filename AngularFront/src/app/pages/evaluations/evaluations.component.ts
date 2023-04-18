import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RankData } from 'src/app/interfaces/rankData.interface ';
import { RankingUserData } from 'src/app/interfaces/rankingUserData.interface';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { AuthService } from 'src/app/services/auth.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss']
})
export class EvaluationsComponent implements OnInit {
  Value: any;
  RankingData: any
  rankingUserData: any
  newAssignment: FormGroup;
  evaluation: FormGroup;
  rankingsDataUsuario: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]
  rankingDatos: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]
  rankingsUsuario: any
  comprobante: boolean = true
  rankIdCache: number = 0;
  UsersRankingData: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]
  User: UserData[] = [{
    id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "",
    Nivel_autonomia_e_iniciativa: 0, Nivel_cooperacion: 0, Nivel_gestion_emocional: 0, Nivel_habilidades_de_pensamiento: 0, Nivel_responsabilidad: 0, puntos_skill: 0
  }];
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public assignmentService: AssignmentsService,
    public authService: AuthService,
    public rankingService: RankingService,
    public evaluationService: EvaluationService
  ) {
    this.newAssignment = this.fb.group({
      rank_code: [''],
    });

    this.evaluation = this.fb.group({
      soft_skill: [],
      puntos: []
    });
  }

  ngOnInit(): void {
    this.UsersRankingData = [];
    this.RankingData = [];
    this.User = [];

    this.rankingService.getRankingDataByUser(this.authService.UserData.id);
    this.rankingService.getRanking();
    this.rankingsDataUsuario = this.rankingService._data1;
    this.rankingService.getRankingDataByCode(this.rankingService.rankCache.id)
    this.UsersRankingData = this.rankingService._data3;
    this.rankingService.getUser();
    this.User = this.rankingService._data4;
  }

  onSubmit() {
    this.Value = this.newAssignment.value;
    console.log(this.Value)
    this.rankingService.getRankingDataByCode(this.Value.rank_code)
    this.rankingDatos = this.rankingService._data3;
  }

  evaluar(user_id: number) {
    this.Value = this.evaluation.value;
    this.Value.soft_skill = parseInt(this.Value.soft_skill)
    this.Value.user_id = user_id;
    this.evaluationService.evaluar(this.Value)
  }
}
