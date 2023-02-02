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
    nick: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    centro: new FormControl('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    const nickname = this.registerForm.controls['nick'].value;
    const name = this.registerForm.controls['nombre'].value;
    const lastname = this.registerForm.controls['apellidos'].value;
    const mail = this.registerForm.controls['email'].value;
    const pass = this.registerForm.controls['password'].value;
    const cent = this.registerForm.controls['centro'].value;

    const logData: RegisterData = {
      nick: (nickname) ? nickname : '',
      nombre: (name) ? name: '',
      apellidos: (lastname) ? lastname: '',
      email: (mail) ? mail : '',
      password: (pass) ? pass : '',
      centro: (cent) ? cent : '', 
    };

    this.authService.register(logData)
      .subscribe({ // Una vez se inicia sesión correctamente se redirige al main
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['/main'])
      });
  }

}
