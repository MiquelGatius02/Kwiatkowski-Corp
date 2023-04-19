import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createRank } from 'src/app/interfaces/createRankingData';
import { JoinRank } from 'src/app/interfaces/joinRank.interface';
import { PetitionsData } from 'src/app/interfaces/petitionsData.interface';
import { RankData } from 'src/app/interfaces/rankData.interface ';
import { RankingUserData } from 'src/app/interfaces/rankingUserData.interface';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PetitionsService } from 'src/app/services/petitions.service';
import { RankingService } from 'src/app/services/ranking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  profileData: UserData = { id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "", imagen: "" };
  UserRankingData: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }];
  RankingData: RankData[] = [{ id: 0, rank_name: "", rank_description: "", id_creador: 0 }];
  noLoop: boolean = true;


  //Unirse/Crear Rankings
  joinData: JoinRank = { rank_code: 0, user_logged: 0 };
  crearData: RankData = { id: 0, rank_name: "", rank_description: "", id_creador: 0 };
  joinForm: FormGroup;
  createForm: FormGroup;

  //Gestionar peticiones
  PetitionsData: PetitionsData[] = [{ id: 0, rank_code: 0, user_id: 0 }];
  showTable: boolean = false;

  //Mostrar alertas
  suscrito: boolean = false;

  constructor(
    public authService: AuthService,
    public rankingService: RankingService,
    public fb: FormBuilder,
    public router: Router,
    public petitionsService: PetitionsService
  ) {
    this.authService.profile();

    this.joinForm = this.fb.group({

      rank_id: ! '',

    });

    this.createForm = this.fb.group({
      id: [''],
      rank_name: ['', Validators.required],
      rank_description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.profileData = this.authService.UserData;
    this.UserRankingData = this.UserRankingData.splice(0, this.UserRankingData.length)
    this.RankingData = this.RankingData.splice(0, this.RankingData.length)
    this.authService.profile()
    this.rankingService.getRanking()
    this.UserRankingData = this.rankingService._data1
    this.RankingData = this.rankingService._data2;
    // console.log(this.rankingService)
    this.checkRanking()
  }

  checkRanking() {
    if (this.authService.UserData.date != undefined) {
      for (let i = 0; i < this.UserRankingData.length; i++) {
        if (this.UserRankingData[i].user_id == this.profileData.id) {
          // console.log(this.UserRankingData[i].user_id && this.profileData.id)
          this.suscrito = true;
        }
        else {
          this.suscrito = false;
        }
      }
    }
    else {
      // console.log("aqui")
      for (let i = 0; i < this.rankingService._data2.length; i++) {
        if (this.rankingService._data2[i].id_creador == this.profileData.id) {
          // console.log(this.rankingService._data2[i].id_creador)
          // console.log(this.rankingService._data2)
          if (i != 0) {
            this.suscrito = true;
          }
          // console.log(this.suscrito)
        }
        else {
          this.suscrito = false;
        }
      }
    }
  }

  clickRanking(rank: RankData) {
    this.rankingService.rankCache = rank
    this.router.navigate(['/home/ranking']);
  }

  onSubmit() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Desea unirse a este ranking?',
      text: "!De enviará una petición al administrador de este ranking!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed && this.joinForm.value.rank_id != true) {
        swalWithBootstrapButtons.fire(
          'Enviado!',
          'Podrá acceder al ranking cuando el administrador acepte su peticion.',
          'success'
        ).then((result2) => {
          if (result2.isConfirmed) {
            this.joinData = this.joinForm.value;
            this.joinData.user_logged = this.authService.UserData.id;
            this.rankingService.addRanking(this.joinData);
            this.joinForm.reset();
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha enviado ninguna solicitud de union.',
          'error'
        )
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha enviado ninguna solicitud de union ya que el input esta vacío.',
          'error'
        )
      }
    })
  }

  createRanking() {
    this.crearData = this.createForm.value;
    const rank_code = this.generateRankCode();
    this.crearData.id = rank_code;
    this.crearData.id_creador = this.authService.UserData.id;
    this.rankingService.createRaking(this.crearData).subscribe(
      (result) => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
          },
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Se ha creado un ranking',
          text: "Un ranking ha sido creado!",
          icon: 'success',
          confirmButtonText: '¡OK!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          } else {
            window.location.reload();
          }
        })
      },
      () => {
        this.joinForm.reset();
        this.router.navigate(['/home/main-page']);
      }
    );
  }

  eliminarRanking(rank: RankData) {
    this.rankingService.deleteRanking(rank);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  generateRankCode(): number {
    // Generar código aleatorio de 5 dígitos
    const code = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    return code;
  }

  verPeticiones() {
    this.petitionsService.getPetitions(this.authService.UserData.id);
    this.PetitionsData = this.petitionsService.dataPetitions;
    if (this.showTable == false) {
      this.showTable = true;
    } else {
      this.showTable = false;
    }
  }

  regenerarCodigo(rank: RankData) {
    let codeNuevo = this.generateRankCode();
    this.rankingService.regenerarCodigo(rank, codeNuevo);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  public setModalTitle(data: string, rank: RankData): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    if (data == 'Regenerar') {

      swalWithBootstrapButtons.fire({
        title: '¿Regenerar el código?',
        text: "!El código del ranking cambiará!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cambiarlo',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Cambiado!',
            'Su código de ranking ha cambiado.',
            'success'
          ).then((result2) => {
            if (result2.isConfirmed) {
              this.regenerarCodigo(rank);
            }
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se ha regenerado el código de ranking',
            'error'
          )
        }
      })

    } else if (data == 'Eliminar') {

      swalWithBootstrapButtons.fire({
        title: '¿Eliminar el ranking?',
        text: "!El ranking y los alumnos asociados a este serán eliminados!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se ha eliminado un ranking.',
            'success'
          ).then((result2) => {
            if (result2.isConfirmed) {
              this.eliminarRanking(rank);
            }
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se ha eliminado ningún ranking',
            'error'
          )
        }
      })
    }
  }
}

