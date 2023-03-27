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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  profileData: UserData = { id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "", imagen: "" };
  UserRankingData: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }];
  RankingData: RankData[] = [{ id: 0, rank_name: "", rank_description: "",id_creador:0 }];
  noLoop: boolean = true;

  //Unirse/Crear Rankings
  joinData: JoinRank = { rank_code: 0, user_logged: 0};
  crearData: RankData = { id: 0, rank_name: "", rank_description: "",id_creador:0 };
  joinForm: FormGroup;
  createForm: FormGroup;

  //Gestionar peticiones
  PetitionsData: PetitionsData[] = [{ id: 0, rank_code: 0, user_id: 0 }];
  showTable: boolean = false;
  
  //Mostrar alertas
  showAlert: boolean = false;
  showAlertError: boolean = false;
  showAlertAceptada: boolean = false;
  showAlertErrorAceptada: boolean = false;

  constructor(
    public authService: AuthService,
    public rankingService: RankingService,
    public fb: FormBuilder,
    public router: Router,
    public petitionsService: PetitionsService
  ) {
    this.authService.profile();

    this.joinForm = this.fb.group({

      rank_id: '',

    });

    this.createForm = this.fb.group({
      id: [''],
      rank_name: ['', Validators.required],
      rank_description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.UserRankingData = this.UserRankingData.splice(0, this.UserRankingData.length)
    this.RankingData = this.RankingData.splice(0, this.RankingData.length)
    this.authService.profile()
    this.rankingService.getRanking()
    this.UserRankingData = this.rankingService._data1
    this.RankingData = this.rankingService._data2;
  }

  clickRanking(rank: RankData) {
    this.rankingService.rankCache = rank
    this.router.navigate(['/home/ranking']);
  }

  onSubmit() {

    this.joinData = this.joinForm.value;
    this.joinData.user_logged = this.authService.UserData.id;
    this.rankingService.addRanking(this.joinData);
    this.joinForm.reset();
  }

  createRanking() {
    this.crearData = this.createForm.value;
    const rank_code = this.generateRankCode();
    this.crearData.id = rank_code;
    this.crearData.id_creador = this.authService.UserData.id;
    this.rankingService.createRaking(this.crearData).subscribe(
      (result) => {
        // console.log(result);
        window.location.reload();
      },
      () => {
        this.joinForm.reset();
        this.router.navigate(['/home/main-page']);
      }
    );
  }

  eliminarRanking(rank: RankData) {
    this.rankingService.deleteRanking(rank);
  }

  generateRankCode(): number {
    // Generar código aleatorio de 5 dígitos
    const code = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    return code;
  }

  verPeticiones(){
    this.petitionsService.getPetitions(this.authService.UserData.id);
    this.PetitionsData = this.petitionsService.dataPetitions; 
    if(this.showTable == false){
      this.showTable = true;
    }else{
      this.showTable = false;
    }
  }

  aceptarPeticion(){
    this.petitionsService.aceptarPeticion(this.PetitionsData[0].id,this.PetitionsData[0].rank_code,this.PetitionsData[0].user_id);

    if(this.petitionsService.Petitions.msg == 'Tenemos estas peticiones'){
      this.showAlertAceptada = true;
        setTimeout(() => {
          this.showAlertAceptada = false;
          this.verPeticiones();
        }, 2000);
        this.showAlertAceptada = true;
    }else{
      this.showAlertErrorAceptada = true;
      setTimeout(() => {
        this.showAlertErrorAceptada = false;
        this.verPeticiones();
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
          this.verPeticiones();
        }, 2000);
        this.showTable = true;
    }else{
      this.showAlertError = true;
      setTimeout(() => {
        this.showAlertError = false;
        this.verPeticiones();
      }, 2000);
      this.showAlertError = true;
    }
  }
}

