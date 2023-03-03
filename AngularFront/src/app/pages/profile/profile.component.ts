import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { imgData } from 'src/app/interfaces/imgData.interface';
import { passwordData } from 'src/app/interfaces/passwordData.interface';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AuthService } from 'src/app/services/auth.service';
import { changeImgService } from 'src/app/services/changeImg.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileData: UserData = { id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: ""};
  
  imgData: imgData = { id: 0, img: "" };
  
  passwordData: passwordData = { id: 0, password: "" };
  passwordForm: FormGroup;
  typeUser: number = 0;

  showAlert: boolean = false;
  errors: any = null;
  url: any;
  
  constructor(
    public authService: AuthService,
    public router: Router,
    public fb: FormBuilder,
    public imgChange: changeImgService
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

  // función para cambiar la imagen
  onImageChange() {
    const newImage = prompt('Introduce la URL de la nueva imagen');
    if (newImage) {
      this.imgData.img = newImage;
      this.imgData.id = this.profileData.id;
      this.imgChange.changeImg(this.imgData).subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          this.errors = error.error;
        },
      );
      
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if(reader.result != null){
          const imageBase64 = reader.result.toString();
          this.imgData.img = imageBase64;
          this.imgData.id = this.profileData.id;
          this.imgChange.changeImg(this.imgData).subscribe(
            (result) => {
              console.log(result);
            },
            (error) => {
              this.errors = error.error;
            },
          );
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
        }
      };
    }
  }
}
