import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './pages/header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AssignmentComponent } from './pages/assignment/assignment.component';
import { VerPetiticionesComponent } from './pages/ver-petiticiones/ver-petiticiones.component';
import { AssignmentDataComponent } from './pages/assignment-data/assignment-data.component';
import { HistorialEvaluationsComponent } from './pages/historial-evaluations/historial-evaluations.component';
import { EvaluationsComponent } from './pages/evaluations/evaluations.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NotfoundComponent,
    HomeComponent,
    RankingComponent,
    AssignmentComponent,
    VerPetiticionesComponent,
    AssignmentDataComponent,
    HistorialEvaluationsComponent,
    EvaluationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }