import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ProfilePageStudentsComponent } from './profile-page-students/profile-page-students.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';


console.log("hola");
const routes: Routes = [

  {path: '',component:MainPageComponent},
  {path: 'perfil-prof', component: ProfilePageComponent },
  {path: 'perfil-alumno', component: ProfilePageStudentsComponent },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
