import { Component, OnInit } from '@angular/core';
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
    this.RankingData;
    this.rankingUserData = [];
    this.rankingService.getRanking();
    this.rankingService.getRankingDataByUser(this.authService.Data.data.id)
    this.RankingData = this.rankingService._data2
    this.rankingUserData = this.rankingService._data1

    console.log(this.RankingData.data.length)
    console.log(this.rankingUserData.data.length)
    for (let i = 0; i < this.RankingData.data.length; i++) {
      if (this.rankingUserData.data[i].user_id == this.authService.Data.data.id) {
        this.rankIdCache = this.rankingUserData.data[i].rank_code;

        for (let j = 0; j < this.rankingUserData.length; j++) {
          if (this.RankingData.data[j].id == this.rankIdCache) {
            this.rankingsUsuario.push(this.RankingData[j])
          }
        }
      }
    }
    console.log(this.rankingsUsuario)
  }

  onSubmit() {
    /*     this.rankingsUsuario = [];
    
        this.rankingService.getRankingDataByCode(this.newAssignment.get('rank_code')?.value)
        this.rankingUserData = this.rankingService._data3 */


  }

}
