import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterStudentsData } from 'src/app/interfaces/register-data-students.interface';
import { passwordMatch } from 'src/app/validators/passwordMatch';


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
  registerForm: FormGroup;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {

    this.registerForm = new FormGroup({
      Nick: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required]),
      Confirm: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', [Validators.required]),
      Apellidos: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
    }, [passwordMatch("Password", "Confirm")] // Comparador / Validador para la contraseña
    );
  }

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    const nickname = this.registerForm.controls['Nick'].value;
    const name = this.registerForm.controls['Nombre'].value;
    const lastname = this.registerForm.controls['Apellidos'].value;
    const mail = this.registerForm.controls['Email'].value;
    const pass = this.registerForm.controls['Password'].value;
    const fechaNacimiento = this.registerForm.controls['fechaNacimiento'].value;

    const logData: RegisterStudentsData = {
      Nick: (nickname) ? nickname : '',
      Nombre: (name) ? name : '',
      Apellidos: (lastname) ? lastname : '',
      Email: (mail) ? mail : '',
      Password: (pass) ? pass : '',
      fechaNacimiento: (fechaNacimiento) ? fechaNacimiento : '',
    };

    this.authService.register_student(logData)
      .subscribe({ // Una vez se inicia sesión correctamente se redirige al main
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['/main'])
      });
  }

}
