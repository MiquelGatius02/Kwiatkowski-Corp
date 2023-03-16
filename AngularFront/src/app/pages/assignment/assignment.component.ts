import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { assignmentData } from 'src/app/interfaces/assignmentData';
import { RankData } from 'src/app/interfaces/rankData.interface ';
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
  RankingData: RankData[] = [{ id: 0, rank_name: "", rank_description: "" }]
  Value: assignmentData = { id: 0, assignment_name: "", rank_code: 0, prof_id: 0 }
  Assignments: assignmentData[] = [{ id: 0, assignment_name: "", rank_code: 0, prof_id: 0 }]
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
    this.assignmentService.createAssignment(this.newAssignment.value).subscribe(
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

}
