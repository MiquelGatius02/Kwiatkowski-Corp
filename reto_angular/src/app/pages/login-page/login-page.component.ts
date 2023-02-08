import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private readonly router: Router
  ) { }

  loginForm = new FormGroup({
    Nick: new FormControl('', [Validators.required]),
    Professor: new FormControl(0, [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    const nickname = this.loginForm.controls['Nick'].value;
    const pass = this.loginForm.controls['Password'].value;
    const prof = this.loginForm.controls['Professor'].value;

    const logData: LoginData = {
      Nick: (nickname) ? nickname : '',
      Password: (pass) ? pass : '',
      Professor: (prof) ? prof : 0
    };


    console.log(prof)
    if (prof == 1) {
      this.authService.login_professor(logData)
        .subscribe({ // Una vez se inicia sesión correctamente se redirige al main
          next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete: () => this.router.navigate(['/perfil-prof'])
        });
    }
    else {
      this.authService.login_student(logData)
        .subscribe({ // Una vez se inicia sesión correctamente se redirige al main
          next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete: () => this.router.navigate(['/perfil-alumno'])
        });
    }
    // console.log(perfil);

  }

}
