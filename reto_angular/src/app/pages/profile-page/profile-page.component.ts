import { Component, OnInit } from '@angular/core';
import { RegisterStudentsData } from 'src/app/interfaces/register-data-students.interface';
import { UserDataProf } from 'src/app/interfaces/user-data-prof.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordService } from 'src/app/services/changePassword.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, Form, AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { newPass } from 'src/app/interfaces/newPass.interface';
import { ChangePasswordData } from 'src/app/interfaces/changePass.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page-students',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {



  changeForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
    private readonly router: Router
  ) {
    this.changeForm = new FormGroup({
      Password: new FormControl('', [Validators.required]),
    }
    )
  }
  perfil: UserDataProf = { Imagen: '', Nick: '', Nombre: '', Apellidos: '', Email: '', Centro: '', Password: '', id: 0 }; // toni maricon

  ngOnInit(): void {
    this.perfil = this.authService.perfilProf;
  }
  cambiarContrasena() {
    const nick = this.authService.perfilProf.Nick;
    const password = this.changeForm.controls['Password'].value;

    const logData: ChangePasswordData = {
      Nick: (nick) ? nick : '',
      Password: (password) ? password : ''
    };

    this.passwordService.changePasswordStud(logData)
      .subscribe({ // Una vez se inicia sesión correctamente se redirige al main
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['/main'])
      });
  }
}


