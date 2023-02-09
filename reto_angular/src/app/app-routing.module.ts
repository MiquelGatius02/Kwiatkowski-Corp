import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';
import { registerPageComponent } from './pages/register-page/register-page.component';
import { registerPageStudentsComponent } from './pages/register-page-students/register-page-students.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfilePageStudentsComponent } from './pages/profile-page-students/profile-page-students.component';

//TODO: Definir las ruta/s que correspondan
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'registro-profesor', component: registerPageComponent },
  { path: 'registro-alumno', component: registerPageStudentsComponent },
  {
    path: 'login',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuard]
  },
  { path: 'main', component: MainPageComponent },
  { path: 'perfil-prof', component: ProfilePageComponent },
  { path: 'perfil-alumno', component: ProfilePageStudentsComponent },
  { path: '**', component: NotfoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
