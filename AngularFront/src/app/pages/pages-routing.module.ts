import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RankingPageComponent } from './ranking-page/ranking-page.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'ranking', component: RankingPageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }