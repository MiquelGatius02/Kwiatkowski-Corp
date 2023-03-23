import { Component, OnInit } from '@angular/core';
import { PetitionsData } from 'src/app/interfaces/petitionsData.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PetitionsService } from 'src/app/services/petitions.service';

@Component({
  selector: 'app-ver-petiticiones',
  templateUrl: './ver-petiticiones.component.html',
  styleUrls: ['./ver-petiticiones.component.scss']
})
export class VerPetiticionesComponent implements OnInit {

  PetitionsData: PetitionsData[] = [{ id: 0, rank_code: 0, user_id: 0 }];

  //Mostrar alertas
  showAlert: boolean = false;
  showAlertError: boolean = false;
  showAlertAceptada: boolean = false;
  showAlertErrorAceptada: boolean = false;


  constructor(
    public authService: AuthService,
    public petitionsService: PetitionsService,

  ) {}

  ngOnInit(): void {
    this.petitionsService.getPetitions(this.authService.UserData.id);
    this.PetitionsData = this.petitionsService.dataPetitions;
  }

  aceptarPeticion(){
    this.petitionsService.aceptarPeticion(this.PetitionsData[0].id,this.PetitionsData[0].rank_code,this.PetitionsData[0].user_id);
    console.log(this.petitionsService);
    if(this.petitionsService.Petitions.msg == 'Tenemos estas peticiones'){
      this.showAlertAceptada = true;
        setTimeout(() => {
          this.showAlertAceptada = false;
          this.petitionsService.getPetitions(this.authService.UserData.id);
          this.PetitionsData = this.petitionsService.dataPetitions;
        }, 2000);
        this.showAlertAceptada = true;
    }else{
      this.showAlertErrorAceptada = true;
      setTimeout(() => {
        this.showAlertErrorAceptada = false;
      }, 2000);
      this.showAlertErrorAceptada = true;
    }
  }

  denegarPeticion(){
    this.petitionsService.denegarPeticion(this.PetitionsData[0].id);

    if(this.petitionsService.Petitions.msg == 'Tenemos estas peticiones'){
      this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
          this.petitionsService.getPetitions(this.authService.UserData.id);
          this.PetitionsData = this.petitionsService.dataPetitions;
        }, 2000);
    }else{
      this.showAlertError = true;
      setTimeout(() => {
        this.showAlertError = false;
      }, 2000);
      this.showAlertError = true;
    }
  }

}
