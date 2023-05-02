import { Component, OnInit } from '@angular/core';
import { PetitionsData } from 'src/app/interfaces/petitionsData.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PetitionsService } from 'src/app/services/petitions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-petiticiones',
  templateUrl: './ver-petiticiones.component.html',
  styleUrls: ['./ver-petiticiones.component.scss']
})
export class VerPetiticionesComponent implements OnInit {

  PetitionsData: PetitionsData[] = [{ id: 0, rank_code: 0, user_id: 0 }];


  constructor(
    public authService: AuthService,
    public petitionsService: PetitionsService,

  ) {}

  ngOnInit(): void {
    this.petitionsService.getPetitions(this.authService.UserData.id);
    this.PetitionsData = this.petitionsService.dataPetitions;
  }

  aceptarPeticion(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Aceptar petición?',
      text: "!Se aceptará la petición del usuario!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptarlo',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          '¡Aceptado!',
          'Se ha aceptado una petición.',
          'success'
        ).then((result2) => {
          if (result2.isConfirmed) {
            this.petitionsService.aceptarPeticion(this.PetitionsData[0].id,this.PetitionsData[0].rank_code,this.PetitionsData[0].user_id);
            this.petitionsService.getPetitions(this.authService.UserData.id);
            this.PetitionsData = this.petitionsService.dataPetitions;
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La petición NO ha sido aceptada',
          'error'
        )
      }
    })
  }

  denegarPeticion(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Denegar petición?',
      text: "!Se denegará esta petición de unión!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, degenarla',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          '¡Denegado!',
          'Se ha denegado una petición.',
          'success'
        ).then((result2) => {
          if (result2.isConfirmed) {
            this.petitionsService.denegarPeticion(this.PetitionsData[0].id);
            this.petitionsService.getPetitions(this.authService.UserData.id);
            this.PetitionsData = this.petitionsService.dataPetitions;
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La petición NO ha sido denegada',
          'error'
        )
      }
    })
  }

}
