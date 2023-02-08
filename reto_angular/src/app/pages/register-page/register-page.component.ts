import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterData } from 'src/app/interfaces/register-data.interface';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['register-page.component.css']
})

export class registerPageComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  registerForm = new FormGroup({
    Nick: new FormControl('',[Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required]),
    Nombre: new FormControl('', [Validators.required]),
    Apellidos: new FormControl('', [Validators.required]),
    Centro: new FormControl('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    const nickname = this.registerForm.controls['Nick'].value;
    const name = this.registerForm.controls['Nombre'].value;
    const lastname = this.registerForm.controls['Apellidos'].value;
    const mail = this.registerForm.controls['Email'].value;
    const pass = this.registerForm.controls['Password'].value;
    const cent = this.registerForm.controls['Centro'].value;

    const logData: RegisterData = {
      Nick: (nickname) ? nickname : '',
      Nombre: (name) ? name: '',
      Apellidos: (lastname) ? lastname: '',
      Email: (mail) ? mail : '',
      Password: (pass) ? pass : '',
      Centro: (cent) ? cent : '', 
    };

    this.authService.register_professor(logData)
      .subscribe({ // Una vez se inicia sesión correctamente se redirige al main
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['/main'])
      });
  }

}
