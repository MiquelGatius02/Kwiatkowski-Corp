import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { evaluationData } from 'src/app/interfaces/evaluationData.interface';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { RankingService } from 'src/app/services/ranking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial-evaluations',
  templateUrl: './historial-evaluations.component.html',
  styleUrls: ['./historial-evaluations.component.scss']
})
export class HistorialEvaluationsComponent implements OnInit {
  newAssignment: FormGroup;
  Evaluation: evaluationData[] = [{ id: 0, ranking_id: 0, evaluador: 0, evaluado: 0, points: 0, soft_skill: 0, date: 0 }];
  User: UserData[] = [{
    id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "",
    Nivel_autonomia_e_iniciativa: 0, Nivel_cooperacion: 0, Nivel_gestion_emocional: 0, Nivel_habilidades_de_pensamiento: 0, Nivel_responsabilidad: 0, puntos_skill: 0
  }];
  EvaluationDisplay: any[] = [{ id: 0, ranking_id: 0, evaluador: "", evaluado: "", points: 0, soft_skill: 0, date: 0 }]
  showAlertDelete: boolean = false;
  Value: any;
  constructor(
    public authService: AuthService,
    public evaluation: EvaluationService,
    public rankingService: RankingService,
    public fb: FormBuilder
  ) {
    this.newAssignment = this.fb.group({
      value: [''],
      type: [0],
    });
  }

  ngOnInit(): void {
    this.evaluation.getEvaluation();
    this.rankingService.getUser();
  }

  onSubmit() {

    this.User = this.rankingService._data4
    console.log(this.evaluation)
    this.Value = this.newAssignment.value;
    console.log(this.Value)
    let value = this.newAssignment.get('value')?.value
    let type = this.newAssignment.get('type')?.value
    console.log(value)
    if (type = "1") {
      this.evaluation.getEvaluationDate(value)
    }
    if (type = "2") {
      console.log(this.rankingService._data4.length)
      for (let i = 0; i < this.User.length; i++) {
        if (this.rankingService._data4[i].username == value) {
          value = this.rankingService._data4[i].id;
        }
      }
      this.evaluation.getEvaluationEvaluado(value)
    }
    if (type = "3") {
      for (let i = 0; i < this.rankingService._data4.length; i++) {
        if (this.rankingService._data4[i].username == value) {
          value = this.rankingService._data4[i].id;
        }
      }
      this.evaluation.getEvaluationEvaluador(value)
    }
    if (type = 4) {
      this.evaluation.getEvaluationSoftSkill(value)
    }
    if (type = 5) {
    }

  }

  eliminarEvaluation(usuario: any, soft_skill: any, puntos: number) {
    console.log(soft_skill)
    if (soft_skill.includes("Responsabilidad")) {
      soft_skill = 1
    }
    else if (soft_skill.includes("gesti")) {
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

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Desea eliminar este usuario?',
      text: "!Se borrará de este ranking!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'El usuario se ha eliminado con exito.',
          'success'
        ).then((result2) => {
          setTimeout(function () {
          }, 1000);
          this.evaluation.deleteUser(usuario, soft_skill, puntos);
          this.ngOnInit();
          /*           window.location.reload(); */
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha eliminado ningun usuario.',
          'error'
        )
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha eliminado ningun usuario.',
          'error'
        )
      }
    })


  }


}
