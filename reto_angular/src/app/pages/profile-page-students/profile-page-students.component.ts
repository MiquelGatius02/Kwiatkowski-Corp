import { Component, OnInit } from '@angular/core';
import { UserDataStudent } from 'src/app/interfaces/user-data-student.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-page-students',
  templateUrl: './profile-page-students.component.html',
  styleUrls: ['./profile-page-students.component.scss']
})
export class ProfilePageStudentsComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
  ) { }

  perfil: UserDataStudent = { Imagen: '', Nick: '', Nombre: '', Apellidos: '', Email: '', Nacimiento: '', Password: '' }; // toni maricon

  ngOnInit(): void {
    this.perfil = this.authService.perfilStudent;
  }

}
