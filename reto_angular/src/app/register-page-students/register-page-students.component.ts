import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterStudentsData } from 'src/app/interfaces/register-data-students.interface';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-page-students',
  templateUrl: './register-page-students.component.html',
  styleUrls: ['register-page-students.component.css']
})

export class registerPageStudentsComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  registerStudentsForm = new FormGroup({
    nick: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    nacimiento: new FormControl('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    const nickname = this.registerStudentsForm.controls['nick'].value;
    const name = this.registerStudentsForm.controls['nombre'].value;
    const lastname = this.registerStudentsForm.controls['apellidos'].value;
    const mail = this.registerStudentsForm.controls['email'].value;
    const pass = this.registerStudentsForm.controls['password'].value;
    const fechaNacimiento = this.registerStudentsForm.controls['nacimiento'].value;

    const logData: RegisterStudentsData = {
      nick: (nickname) ? nickname : '',
      nombre: (name) ? name: '',
      apellidos: (lastname) ? lastname: '',
      email: (mail) ? mail : '',
      password: (pass) ? pass : '',
      nacimiento: (fechaNacimiento) ? fechaNacimiento : '',
    };

    this.authService.register(logData)
      .subscribe({ // Una vez se inicia sesión correctamente se redirige al main
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['/main'])
      });
  }

}
