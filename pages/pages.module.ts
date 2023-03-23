import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
  ],

  imports: [
    BrowserModule, CommonModule,
  ],
})
export class PagesModule { }
