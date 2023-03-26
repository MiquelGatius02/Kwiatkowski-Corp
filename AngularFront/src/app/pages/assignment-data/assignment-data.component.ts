import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { assignmentData } from 'src/app/interfaces/assignmentData';
import { RankData } from 'src/app/interfaces/rankData.interface ';
import { RankingUserData } from 'src/app/interfaces/rankingUserData.interface';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { AuthService } from 'src/app/services/auth.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-assignment-data',
  templateUrl: './assignment-data.component.html',
  styleUrls: ['./assignment-data.component.scss']
})
export class AssignmentDataComponent implements OnInit {

  newAssignment: FormGroup;
  assignmentData: assignmentData = { id: 0, assignment_name: "", rank_code: 0, prof_id: 0 }
  rankingUserData: RankingUserData[] = [{ id: 0, rank_code: 0, user_id: 0, points: 0 }]
  User: UserData[] = [{ id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "" }];

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public assignmentService: AssignmentsService,
    public authService: AuthService,
    public rankingService: RankingService,
  ) {
    this.newAssignment = this.fb.group({
      assignment_id: [''],
      user_id: [''],
      points: [''],
    });
  }

  ngOnInit(): void {
    this.assignmentData = this.rankingService.rankCache2;
    console.log(this.rankingService.rankCache2)
    this.rankingService.getUser()
    this.rankingService.getRankingDataByCode(this.assignmentData.rank_code)
  }

  onSubmit() {
    let cosa: any = 0;
    cosa = this.newAssignment.getRawValue();
    console.log(cosa)
  }

}
