import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { assignmentData } from 'src/app/interfaces/assignmentData';
import { assignmentData_info } from 'src/app/interfaces/assignmentData_info';
import { RankData } from 'src/app/interfaces/rankData.interface ';
import { RankingUserData } from 'src/app/interfaces/rankingUserData.interface';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { AuthService } from 'src/app/services/auth.service';
import { RankingService } from 'src/app/services/ranking.service';

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
    this.rankingService.getRanking();
    this.RankingData = this.rankingService._data2;
    this.RankingData.splice(0, 1)
    this.assignmentService.getAssignment();
    this.Assignments = this.assignmentService._data1;

    console.log(this.Assignments)
  }

  delAssignment(id: number) {
    console.log(id)
    const assignmentCache: assignmentData = { id: 0, assignment_name: "", rank_code: 0, prof_id: 0 }
    assignmentCache.id = id;
    this.assignmentService.delAssignment(assignmentCache).subscribe(
      (result) => {
      },
      (error) => {
        this.newAssignment = error.error;
      },
      () => {
        this.newAssignment.reset();
        window.location.reload();
      }
    );
  }

  onSubmit() {
    this.Value = this.newAssignment.value;
    this.Value.prof_id = this.authService.UserData.id
    this.rankingService.getRankingDataByCode(this.Value.rank_code)
    this.assignmentService.createAssignment(this.newAssignment.value).subscribe(
      (result) => {
        console.log(result)
        this.Value = result;

      },
      (error) => {
        this.newAssignment = error.error;
      },
      () => {
        this.AssignmentsData.assignment_id = this.Value.id;
        this.AssignmentsData.points = 0;
        console.log(this.rankingService._data3.length)
        for (let i = 0; i < this.rankingService._data3.length; i++) {
          this.AssignmentsData.user_id = this.rankingService._data3[i].user_id
          console.log(this.AssignmentsData)
          this.assignmentService.createAssignmentData(this.AssignmentsData).subscribe(
            (result) => {
              console.log(result)
            }
          )
        }

        setTimeout(function () {
          window.location.reload();
        }, 1000);

      }
    );
  }



  assigmentData(assigmentData: assignmentData) {
    this.rankingService.rankCache2 = assigmentData;
    this.router.navigate(['home/assignment-data']);
  }

}
