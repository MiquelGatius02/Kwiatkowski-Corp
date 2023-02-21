import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileData: UserData = { username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "" };

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.profile();
    this.profileData = this.authService.UserData;
  }

}
