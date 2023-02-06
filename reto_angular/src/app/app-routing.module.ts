import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';
import { registerPageComponent } from './register-page/register-page.component';
import { registerPageStudentsComponent } from './register-page-students/register-page-students.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfilePageStudentsComponent } from './profile-page-students/profile-page-students.component';

//TODO: Definir las ruta/s que correspondan
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'registro-profesor', component: registerPageComponent },
  { path: 'registro-alumno', component: registerPageStudentsComponent },
  { path: 'perfil-prof', component: ProfilePageComponent },
  { path: 'perfil-alumno', component: ProfilePageStudentsComponent },
  {
    path: 'main',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotfoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
