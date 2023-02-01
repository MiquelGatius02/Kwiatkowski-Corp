import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';



const routes: Routes = [

  {path: '',component:LoginPageComponent},
  // {path: 'articulos', component:ArticulosPageComponent},
  // {path: 'fotos', component: FotosPageComponent},
  // {path: 'fotos-details/:id', component: FotosDetailPageComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
