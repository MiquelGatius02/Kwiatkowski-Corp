import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { assignmentData } from 'src/app/interfaces/assignmentData';
import { RankingUserData } from 'src/app/interfaces/rankingUserData.interface';
import { setPoints } from 'src/app/interfaces/setPoints';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { AuthService } from 'src/app/services/auth.service';
import { RankingService } from 'src/app/services/ranking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assignment-data',
  templateUrl: './assignment-data.component.html',
  styleUrls: ['./assignment-data.component.scss']
})
export class AssignmentDataComponent implements OnInit {

  changePoints: FormGroup;
  Valor: setPoints = { id: 0, user_id: 0, points: 0 }
  assignmentData: assignmentData = { id: 0, assignment_name: "", rank_code: 0, prof_id: 0 }
  rankingUserData: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]
  User: UserData[] = [{ id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "" }];
  location: any;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public assignmentService: AssignmentsService,
    public authService: AuthService,
    public rankingService: RankingService,
  ) {
    this.changePoints = this.fb.group({
      points: [''],
      user_id: ['']
    });
  }

  ngOnInit(): void {
    this.assignmentData = this.rankingService.rankCache2;
    this.rankingService.getUser()
    this.rankingService.getRankingDataByCode(this.assignmentData.rank_code)
  }

  onSubmit(user: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
      },
      buttonsStyling: false
    })

    this.Valor = this.changePoints.value
    this.Valor.id = this.rankingService.rankCache2.id
    this.Valor.user_id = user;

    if (this.Valor.points > 10 || this.Valor.points < 0) {
      swalWithBootstrapButtons.fire(
        '¡Error!',
        'No puede asignar más de un 10 o menos de 0 a esta tarea.',
        'error'
      )
    }else{
      swalWithBootstrapButtons.fire(
        '¡Calificado!',
        'Se ha calificado la tarea.',
        'success'
      ).then((result) => {
        if (result.isConfirmed) {
            this.assignmentService.changePoints(this.Valor);
            this.ngOnInit(); 
        }else{
            this.assignmentService.changePoints(this.Valor);
            this.ngOnInit(); 
        }
      })
    }
  }

  goBack(): void {
    this.router.navigate(['/home/assignment']);
  }

}
