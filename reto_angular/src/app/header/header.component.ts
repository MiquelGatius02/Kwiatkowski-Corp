import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    public authService: AuthService,
    private readonly router: Router
  ) { }

  login = this.authService.login; // Se comprueba si hay una sesión iniciada


  end_session() {
    if (this.authService.login == true) {
      if (confirm("¿Estás seguro de que quieres cerrar sesión? ")) {
        this.router.navigate(['/login'])
        console.log(this.authService.login = false, this.login = false);
      }
    }
  }
}
