import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
