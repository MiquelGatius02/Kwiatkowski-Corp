import { Component, OnInit } from '@angular/core';
import { RegisterStudentsData } from 'src/app/interfaces/register-data-students.interface';
import { UserDataProf } from 'src/app/interfaces/user-data-prof.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordService } from 'src/app/services/changePassword.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, Form, AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-profile-page-students',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {


  newPass: string;


  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService
  ) {
    this.newPass = "";
  }
  perfil: UserDataProf = { Imagen: '', Nick: '', Nombre: '', Apellidos: '', Email: '', Centro: '', Password: '', id: 0 }; // toni maricon

  ngOnInit(): void {
    this.perfil = this.authService.perfilProf;
  }


  cambiarContrasena(newPassword: string) {
    // this.changePass.id = this.newPass.get('id').value;
    /*     this.passwordService.changePasswordStud(newPassword); */
    console.log(newPassword)
  }

}
