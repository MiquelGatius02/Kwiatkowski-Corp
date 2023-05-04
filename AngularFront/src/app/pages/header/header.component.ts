import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UserData } from 'src/app/interfaces/userData.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userData: UserData = { id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "" };
  session: boolean = this.token.isLoggedIn();
  interval: NodeJS.Timer | undefined;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService
  ) { }

  ngOnInit(): void {
    this.authService.profile();
    this.userData = this.authService.UserData;
    this.authService.loginStatusChange().subscribe(loggedIn => {
      this.session = loggedIn;
    });
    this.startTimer()
  }

  startTimer() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    this.interval = setInterval(() => {
      swalWithBootstrapButtons.fire({
        title: '¡La sesión ha caducado!',
        text: "Ha caducado la sesión, por tanto se cerrará la página.",
        icon: 'warning',
        confirmButtonText: 'Ok',
      }).then((result) => {
        this.endSession()
        this.router.navigate(['/main']);
      })
    }, 7200000)
  }

  endSession() {
    this.token.removeToken()
    this.router.navigate(['/main']);
    this.session = false;
  }

}
