import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-select-register',
  templateUrl: './select-register.component.html',
  styleUrls: ['./select-register.component.scss']
})
export class SelectRegisterComponent implements OnInit {

  constructor(public service: AuthService, public router: Router,) { }

  ngOnInit(): void {
  }

  // FUNCIONES DESTINADAS A CAMBIAR EL TIPO DE USUARIO
  selectProf() {
    this.service.changeType(1);
    this.router.navigate(['register']);
  }
  selectStud() {
    this.service.changeType(0);
    this.router.navigate(['register']);
  }
  login() {
    this.router.navigate(['login'])
  }
}
