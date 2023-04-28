import { Component, OnInit } from '@angular/core';
import { evaluationData } from 'src/app/interfaces/evaluationData.interface';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-historial-evaluations',
  templateUrl: './historial-evaluations.component.html',
  styleUrls: ['./historial-evaluations.component.scss']
})
export class HistorialEvaluationsComponent implements OnInit {
  Evaluation: evaluationData[] = [{ id: 0, ranking_id: 0, evaluador: 0, evaluado: 0, points: 0, soft_skill: 0, date: 0 }];
  User: UserData[] = [{
    id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "",
    Nivel_autonomia_e_iniciativa: 0, Nivel_cooperacion: 0, Nivel_gestion_emocional: 0, Nivel_habilidades_de_pensamiento: 0, Nivel_responsabilidad: 0, puntos_skill: 0
  }];
  EvaluationDisplay: any[] = [{ id: 0, ranking_id: 0, evaluador: "", evaluado: "", points: 0, soft_skill: 0, date: 0 }]
  showAlertDelete: boolean = false;
  constructor(
    public authService: AuthService,
    public evaluation: EvaluationService,
    public rankingService: RankingService,

  ) {

  }

  ngOnInit(): void {

    this.evaluation.getEvaluation();
    this.rankingService.getUser();
    this.User = []
    this.User = this.rankingService._data4;
    this.Evaluation = this.evaluation._data1;
    this.EvaluationDisplay = this.evaluation.EvaluationDisplay
  }

  eliminarEvaluation(usuario: number, soft_skill: any, puntos: number) {
    console.log(soft_skill)
    if (soft_skill.includes("Responsabilidad")) {
      soft_skill = 1
    }
    else if (soft_skill.includes("Gesti")) {
      soft_skill = 2
    }
    else if (soft_skill.includes("Autonom")) {
      soft_skill = 3
    }
    else if (soft_skill.includes("Cooperaci")) {
      soft_skill = 4
    }
    else if (soft_skill.includes("Habilidades de pensamiento")) {
      soft_skill = 5
    }
    console.log(soft_skill)
    if (confirm("¿Seguro desea borrar este usuario?")) {
      this.evaluation.deleteUser(usuario, soft_skill, puntos);
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
