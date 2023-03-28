import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentDataComponent } from './assignment-data/assignment-data.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RankingComponent } from './ranking/ranking.component';
import { VerPetiticionesComponent } from './ver-petiticiones/ver-petiticiones.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'main-page', component: HomeComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'assignment', component: AssignmentComponent },
  { path: 'ver-peticiones', component: VerPetiticionesComponent },
  { path: 'assignment-data', component: AssignmentDataComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }