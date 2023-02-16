import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileData: UserData = { username: "", email: "", firstname: "", lastname: "", centro: "", date: "", password: "" };

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {

    if (this.profileData.centro != undefined)
      this.authService.profileProfesor();
    else if (this.profileData.date != undefined) {
      this.authService.profileStudent();
    }
    this.profileData = this.authService.UserData;

  }

}
