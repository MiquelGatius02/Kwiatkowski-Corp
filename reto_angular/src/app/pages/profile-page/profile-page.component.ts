import { Component, OnInit } from '@angular/core';
import { RegisterStudentsData } from 'src/app/interfaces/register-data-students.interface';
import { UserDataProf } from 'src/app/interfaces/user-data-prof.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-page-students',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
  ) {
  }
  perfil: UserDataProf = { Imagen: '', Nick: '', Nombre: '', Apellidos: '', Email: '', Centro: '', Password: '' }; // toni maricon

  ngOnInit(): void {
    this.perfil = this.authService.perfilProf;
  }

}
