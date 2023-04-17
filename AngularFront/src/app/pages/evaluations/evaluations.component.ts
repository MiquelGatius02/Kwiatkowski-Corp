import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RankData } from 'src/app/interfaces/rankData.interface ';
import { RankingUserData } from 'src/app/interfaces/rankingUserData.interface';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { AuthService } from 'src/app/services/auth.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss']
})
export class EvaluationsComponent implements OnInit {
  RankingData: any
  rankingUserData: any
  newAssignment: FormGroup;
  rankingsUsuario: RankData[] = [{ id: 0, rank_name: "", rank_description: "", id_creador: 0 }]
  comprobante: boolean = true
  rankIdCache: number = 0;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public assignmentService: AssignmentsService,
    public authService: AuthService,
    public rankingService: RankingService,
  ) {
    this.newAssignment = this.fb.group({
      rank_code: [''],
    });
  }

  ngOnInit(): void {

    this.rankingService.getRanking();
    this.RankingData = this.rankingService._data2.data;

    console.log(this.RankingData)
    setTimeout(() => {
      for (let i = 0; i < this.RankingData.length; i++) {
        if (this.RankingData.id_creador == this.authService.Data.data.id) {
          this.rankingUserData.push(this.RankingData[i])
        }
        console.log(this.rankingUserData)
      }
    }, 500);


  }


}
