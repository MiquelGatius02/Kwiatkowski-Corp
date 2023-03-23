import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentComponent } from './assignment/assignment.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'main-page', component: HomeComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'assignment', component: AssignmentComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }