import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentDataComponent } from './assignment-data/assignment-data.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { HistorialEvaluationsComponent } from './historial-evaluations/historial-evaluations.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RankingComponent } from './ranking/ranking.component';
import { VerPetiticionesComponent } from './ver-petiticiones/ver-petiticiones.component';

const routes: Routes = [

  { path: '',title:'Principal', component: HomeComponent },
  { path: 'profile', title:'Perfil', component: ProfileComponent },
  { path: 'main-page', title:'Menu', component: HomeComponent },
  { path: 'ranking' , title:'Ranking', component: RankingComponent },
  { path: 'assignment', title:'Tarea', component: AssignmentComponent },
  { path: 'ver-peticiones', title:'Peticiones', component: VerPetiticionesComponent },
  { path: 'assignment-data', title:'Información de tareas', component: AssignmentDataComponent },
  { path: 'evaluations', title:'Evaluaciones', component: EvaluationsComponent },
  { path: 'historial', title:'Historial', component: HistorialEvaluationsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }