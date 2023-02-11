import { Component, OnInit } from '@angular/core';
import { UserDataStudent } from 'src/app/interfaces/user-data-student.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordService } from 'src/app/services/changePassword.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, Form, AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { newPass } from 'src/app/interfaces/newPass.interface';

@Component({
  selector: 'app-profile-page-students',
  templateUrl: './profile-page-students.component.html',
  styleUrls: ['./profile-page-students.component.scss']
})
export class ProfilePageStudentsComponent implements OnInit {


  changePass: newPass;
  newPass: string;

  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService
  ) {
    this.newPass = "";
    this.changePass = { id: 0, Password: "" };
  }

  perfil: UserDataStudent = { Imagen: '', Nick: '', Nombre: '', Apellidos: '', Email: '', Nacimiento: '', Password: '', id: 0 }; // toni maricon

  ngOnInit(): void {
    this.perfil = this.authService.perfilStudent;
  }

  cambiarContrasena(newPassword: string) {
    // this.changePass.id = this.newPass.get('id').value;
    /*     this.passwordService.changePasswordStud(newPassword); */
    console.log(newPassword)
  }

}
