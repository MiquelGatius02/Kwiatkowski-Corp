import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(

    public router: Router,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    if (this.authService.loggedIn) {
      this.router.navigate(['/home/main-page'])
    }
  }

  registerPage() {
    this.router.navigate(['register-select']);
  }

  loginPage() {
    this.router.navigate(['login']);
  }
}
