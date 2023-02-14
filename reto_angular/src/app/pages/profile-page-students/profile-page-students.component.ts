import { Component, OnInit } from '@angular/core';
import { UserDataStudent } from 'src/app/interfaces/user-data-student.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordService } from 'src/app/services/changePassword.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, Form, AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { newPass } from 'src/app/interfaces/newPass.interface';
import { Router } from '@angular/router';
import { ChangePasswordData } from 'src/app/interfaces/changePass.interface';

@Component({
  selector: 'app-profile-page-students',
  templateUrl: './profile-page-students.component.html',
  styleUrls: ['./profile-page-students.component.scss']
})
export class ProfilePageStudentsComponent implements OnInit {


  changePass: newPass;
  newPass: string;
  changeForm: FormGroup;
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
    private readonly router: Router
  ) {
    this.newPass = "";
    this.changePass = { id: 0, Password: "" };
    this.changeForm = new FormGroup({
      Password: new FormControl('', [Validators.required]),
    }
    )
  }

  perfil: UserDataStudent = { Imagen: '', Nick: '', Nombre: '', Apellidos: '', Email: '', Nacimiento: '', Password: '', id: 0 };

  ngOnInit(): void {
    this.perfil = this.authService.perfilStudent;
  }

  cambiarContrasena() {
    const nick = this.authService.perfilStudent.Nick;
    const password = this.changeForm.controls['Password'].value;

    const logData: ChangePasswordData = {
      Nick: (nick) ? nick : '',
      Password: (password) ? password : ''
    };

    console.log("locura")
    this.passwordService.changePasswordStud(logData)
  }

}
