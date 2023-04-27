import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { assignmentData } from 'src/app/interfaces/assignmentData';
import { assignmentData_info } from 'src/app/interfaces/assignmentData_info';
import { RankData } from 'src/app/interfaces/rankData.interface ';
import { RankingUserData } from 'src/app/interfaces/rankingUserData.interface';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { AuthService } from 'src/app/services/auth.service';
import { RankingService } from 'src/app/services/ranking.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  newAssignment: FormGroup;
  RankingData: RankData[] = [{ id: 0, rank_name: "", rank_description: "", id_creador: 0 }]
  Value: any;
  Assignments: assignmentData[] = [{ id: 0, assignment_name: "", rank_code: 0, prof_id: 0 }]
  AssignmentsData: assignmentData_info = { assignment_id: 0, user_id: 0, points: 0 }
  UsersRankingData: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]
  assignmentData: assignmentData = { id: 0, assignment_name: "", rank_code: 0, prof_id: 0 }
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public assignmentService: AssignmentsService,
    public authService: AuthService,
    public rankingService: RankingService,
  ) {
    this.newAssignment = this.fb.group({
      assignment_name: [''],
      rank_code: [''],
    });
  }

  ngOnInit(): void {
    this.RankingData = [];
    this.rankingService.getRanking();
    this.RankingData = this.rankingService._data2;
    this.RankingData.splice(0, 1)
    this.assignmentService.getAssignment();
    this.Assignments = this.assignmentService._data1;
  }

  delAssignment(id: number) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Desea eliminar esta tarea?',
      text: "!Se borrará esta tarea de forma definitiva!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const assignmentCache: assignmentData = { id: 0, assignment_name: "", rank_code: 0, prof_id: 0 }
        assignmentCache.id = id;
        this.assignmentService.delAssignment(assignmentCache).subscribe(
          (result) => {
          },
          (error) => {
            this.newAssignment = error.error;
          },
          () => {
            swalWithBootstrapButtons.fire(
              'Eliminado',
              'Se ha eliminado una de las tareas.',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                this.newAssignment.reset();
                window.location.reload();
              }else{
                this.newAssignment.reset();
                window.location.reload();
              }
            })
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha eliminado ninguna tarea.',
          'error'
        )
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha eliminado ninguna tarea.',
          'error'
        )
      }
    })
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
      title: '¿Desea crear una tarea?',
      text: "!Se creará una tarea!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.Value = this.newAssignment.value;
        this.Value.prof_id = this.authService.UserData.id
        if (this.Value.rank_code == '' || this.Value.rank_code == undefined) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se ha creado ninguna tarea ya que no se puede crear una tarea sin asignarle un ranking.',
            'error'
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }else{
              window.location.reload();
            }
          })
        }
        this.rankingService.getRankingDataByCode(this.Value.rank_code)
        this.assignmentService.createAssignment(this.newAssignment.value).subscribe(
          (result) => {
            this.Value = result;

          },
          (error) => {
            this.newAssignment = error.error;
          },
          () => {
            this.AssignmentsData.assignment_id = this.Value.id;
            this.AssignmentsData.points = 0;
            for (let i = 0; i < this.rankingService._data3.length; i++) {
              this.AssignmentsData.user_id = this.rankingService._data3[i].user_id
              this.assignmentService.createAssignmentData(this.AssignmentsData).subscribe(
                (result) => {
                }
              )
            }
            window.location.reload();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha creado ninguna tarea.',
          'error'
        )
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha creado ninguna tarea.',
          'error'
        )
      }
    })
  }



  assigmentData(assigmentData: assignmentData) {
    this.rankingService.rankCache2 = assigmentData;
    this.router.navigate(['home/assignment-data']);
  }

}
