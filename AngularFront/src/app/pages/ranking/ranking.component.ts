import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RankData } from 'src/app/interfaces/rankData.interface ';
import { RankingUserData } from 'src/app/interfaces/rankingUserData.interface';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { RankingService } from 'src/app/services/ranking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  cacheUser: number = 0;
  Value: any = { soft_skill: 0, puntos: 0, user_id: 0, rank_code: 0 }
  evaluation: FormGroup
  RankingData: RankData[] = [{ id: 0, rank_name: "", rank_description: "", id_creador: 0 }]
  UsersRankingData: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]
  User: UserData[] = [{
    id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "",
    Nivel_autonomia_e_iniciativa: 0, Nivel_cooperacion: 0, Nivel_gestion_emocional: 0, Nivel_habilidades_de_pensamiento: 0, Nivel_responsabilidad: 0, puntos_skill: 0
  }];

  showAlertDelete: boolean = false;

  constructor(
    public authService: AuthService,
    public rankingService: RankingService,
    public fb: FormBuilder,
    public router: Router,
    public evaluationService: EvaluationService
  ) {
    this.evaluation = this.fb.group({
      soft_skill: [],
      puntos: []
    });
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
    console.log(this.User);
  }

  eliminarUsuario(usuario: number, id_rank: number) {
    console.log(usuario);
    console.log(id_rank);

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
          if (result2.isConfirmed) {
            setTimeout(function(){
            },1000);
            this.rankingService.deleteUser(usuario, id_rank);
            window.location.href = '/home/main-page';
          }
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

  evaluar(soft_skill: string, rank_code: number) {
    this.Value = this.evaluation.value;
    this.Value.user_id = this.cacheUser


    if (this.authService.UserData.id == this.Value.user_id) {
      console.log("No te puedes evaluar a ti mismo")
    }


    this.Value = this.evaluation.value;
    if (soft_skill == "Autonmía e iniciativa") {
      this.Value.soft_skill = 3
    }
    else if (soft_skill == "Cooperación") {
      this.Value.soft_skill = 2
    }
    else if (soft_skill == "Gestión emocional") {

      this.Value.soft_skill = 4
    }
    else if (soft_skill == "Habilidades de pensamiento") {
      this.Value.soft_skill = 5
    }
    else if (soft_skill == "Responsabilidad") {
      this.Value.soft_skill = 1

    }
    this.Value.rank_code = rank_code
    console.log(this.Value)
    this.evaluationService.evaluar(this.Value)
    /*    window.location.reload(); */
  }

  public modalTitle: string = '';
  public li1: string = '';
  public li2: string = '';
  public li3: string = '';
  public li4: string = '';
  public li5: string = '';
  public li6: string = '';
  public li7: string = '';
  public li8: string = '';
  public li9: string = '';

  public setModalTitle(data: string, user_id: number): void {

    this.modalTitle = data;
    this.cacheUser = user_id
    

    if (this.modalTitle == 'Responsabilidad') {
      this.li1 = 'Trabaja de forma constante.';
      this.li2 = 'Se mantiene conectado/a a la actividad del grupo.';
      this.li3 = 'Hace comentarios relacionados con la tarea a realizar.';
      this.li4 = 'Realiza las tareas de forma eficiente.';
      this.li5 = 'Realiza las tareas con cuidado.';
      this.li6 = 'Persevera ante las dificultades.';
      this.li7 = 'Respeta las normas.';
    } else if (this.modalTitle == 'Cooperación') {
      this.li1 = 'Escucha a los demás.';
      this.li2 = 'Incorpora lo que dicen los demás.';
      this.li3 = 'Fomenta la participación de los miembros del grupo.';
      this.li4 = 'Participa en la toma de decisiones consensuadas.';
      this.li5 = 'Facilita la resolución de conflictos.';
      this.li6 = 'Reconoce sus responsabilidades y las de los demás.';
      this.li7 = 'Ayuda a los demás de forma desinteresada.';
    } else if (this.modalTitle == 'Habilidades de pensamiento') {
      this.li1 = 'Relaciona contenidos nuevos con conocimientos previos.';
      this.li2 = 'Hace buenas reflexiones sobre los contenidos trabajados.';
      this.li3 = 'Hace buenas reflexiones sobre sus procesos personales internos.';
      this.li4 = 'Hace buenas preguntas (para entender o para permitir avanzar).';
      this.li5 = 'Tiene ideas creativas (explora caminos alternativos).';
      this.li6 = 'Plantea buenas estrategias de resolución de problemas.';
      this.li7 = 'Planifica y prioriza las tareas.';
      this.li8 = 'Tiene interés en explorar perspectivas diferentes.';
      this.li9 = 'Expresa eficazmente las ideas (corrección, precisión y estructura).';
    } else if (this.modalTitle == 'Gestión emocional') {
      this.li1 = 'Transmite alegría.';
      this.li2 = 'Se muestra tranquilo/a en situaciones de presión.';
      this.li3 = 'Controla las emociones en situaciones de conflicto.';
      this.li4 = 'Asume la posibilidad de equivocarse.';
      this.li5 = 'Acepta que los cambios que propone no salgan adelante.';
      this.li6 = 'Adecúa el comportamiento a las circunstancias.';
    } else if (this.modalTitle == 'Autonmía e iniciativa') {
      this.li1 = 'Aporta ideas.';
      this.li2 = 'Hace preguntas cuando se encalla.';
      this.li3 = 'Toma decisiones para que el proyecto avance.';
      this.li4 = 'Sabe convencer al grupo de sus propuestas.';
      this.li5 = 'Trabaja con determinación.';
      this.li6 = 'Cree que puede iniciar cambios.';
    }
  }

}
