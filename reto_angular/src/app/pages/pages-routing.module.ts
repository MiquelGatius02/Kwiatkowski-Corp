import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ProfilePageStudentsComponent } from './profile-page-students/profile-page-students.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { LoginPageComponent } from './login-page/login-page.component';



const routes: Routes = [

  {path: '',component:MainPageComponent},

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
