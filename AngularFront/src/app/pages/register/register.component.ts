import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  error: any = '';
  errorBolNombre: boolean = false;

  constructor(

    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: [''],
      email: new FormControl('', [Validators.required, Validators.email]),
      firstname: [''],
      lastname: [''],
      centerOrDate: [''],
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  // Getter para obtener los errores del campo email
  get emailErrors() {
    const emailControl = this.registerForm.get('email');
    if (emailControl != null) {
      if (emailControl.errors && emailControl.dirty) {
        if (emailControl.errors?.['required']) {
          return 'El correo electrónico es obligatorio.';
        }
        if (emailControl.errors?.['email']) {
          return 'El correo electrónico no es válido.';
        }
        if (emailControl.value && !emailControl.value.includes('@')) {
          return 'El correo electrónico debe contener el carácter @.';
        }
      }
    }
    return null;
  }

  ngOnInit(): void {
    this.typeUser = this.authService.typeUser;
  }
  onSubmit() {
    if (this.registerForm.get('password')!.value == this.registerForm.get('password_confirmation')!.value) {
      if (this.typeUser == 0) {
        this.authService.registerStudent(this.registerForm.value).subscribe(
          (result) => {
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

    else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Las contraseñas no coinciden',
        text: "Las contraseñas no son iguales, no se ha registrado este usuario.",
        icon: 'error',
        confirmButtonText: '¡OK!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
        }
      })
    }

  }

  // Obtener los errores del campo nombre
  controlChars(e: any) {
    var regex = new RegExp("^[a-zA-Z0-9_]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }

    e.preventDefault();
    this.error = 'Este campo solo permite: Letras, Números y Guión bajo';
    this.errorBolNombre = true;
    return false;
  }

  onPaste(e: any) {
    e.preventDefault();
    return false;
  }


}
