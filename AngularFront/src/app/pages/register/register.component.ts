import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  typeUser: number = 0;
  registerForm: FormGroup;
  errors: any = null;

  constructor(

    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: [''],
      email: [''],
      firstname: [''],
      lastname: [''],
      centerOrDate: [''],
      password: [''],
    });
  }
  ngOnInit(): void {
    this.typeUser = this.authService.typeUser;
  }
  onSubmit() {
    if (this.typeUser == 0) {
      this.authService.registerStudent(this.registerForm.value).subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          this.errors = error.error;
        },
        () => {
          this.registerForm.reset();
          this.router.navigate(['login']);
        }
      );
    }
    else {
      this.authService.registerProfessor(this.registerForm.value).subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          this.errors = error.error;
        },
        () => {
          this.registerForm.reset();
          this.router.navigate(['login']);
        }
      );
    }
  }


}
