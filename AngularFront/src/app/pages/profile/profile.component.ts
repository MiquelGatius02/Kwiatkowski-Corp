import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordData } from 'src/app/interfaces/passwordData.interface';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileData: UserData = { id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "" };
  passwordData: passwordData = { id: 0, password: "" };
  passwordForm: FormGroup;
  typeUser: number = 0;
  errors: any = null;
  url: any;

  constructor(
    public authService: AuthService,
    public router: Router,
    public fb: FormBuilder,
  ) {
    this.passwordForm = this.fb.group({
      id: [''],
      password: [''],
    });
  }
  onSubmit() {
    this.passwordData = this.passwordForm.value
    this.passwordData.id = this.profileData.id;
    this.authService.changePassword(this.profileData)

    console.log(this.passwordData)

    this.authService.changePassword(this.passwordForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.passwordForm.reset();
        this.router.navigate(['/home/profile']);
      }
    );

  }


  ngOnInit(): void {
    this.authService.profile();
    this.profileData = this.authService.UserData;
  }

}
