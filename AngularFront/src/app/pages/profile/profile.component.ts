import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { imgData } from 'src/app/interfaces/imgData.interface';
import { passwordData } from 'src/app/interfaces/passwordData.interface';
import { UserData } from 'src/app/interfaces/userData.interface';
import { AuthService } from 'src/app/services/auth.service';
import { changeImgService } from 'src/app/services/changeImg.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileData: UserData = { id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "" };

  imgData: imgData = { id: 0, img: "" };

  passwordData: passwordData = { id: 0, password: "" };
  passwordForm: FormGroup;
  typeUser: number = 0;

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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que desea cambiar la contaseña?',
      text: "¡Se cambiará irreversiblemente la contraseña de este usuario!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          '¡Cambiado!',
          'La contraseña de este usuario ha sido cambiada.',
          'success'
        ).then((result2) => {
          if (result2.isConfirmed) {
            
            this.passwordData = this.passwordForm.value
            this.passwordData.id = this.profileData.id;
            this.authService.changePassword(this.profileData)
            this.authService.changePassword(this.passwordForm.value).subscribe(
              (result) => {
                window.location.reload();
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
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha enviado ninguna solicitud de cambio de contraseña.',
          'error'
        )
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha enviado ninguna solicitud de cambio de contraseña.',
          'error'
        )
      }
    })

  }

  ngOnInit(): void {
    this.authService.profile();
    this.profileData = this.authService.UserData;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result != null) {
          const imageBase64 = reader.result.toString();
          this.imgData.img = imageBase64;
          this.imgData.id = this.profileData.id;
          this.imgChange.changeImg(this.imgData).subscribe(
            (result) => {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                },
                buttonsStyling: false
              })
              swalWithBootstrapButtons.fire({
                title: 'La imagen ha sido cambiada',
                text: "La imagen asignada a este usuario ha sido modificada.",
                icon: 'warning',
                confirmButtonText: '¡OK!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              })
            },
            (error) => {
              this.errors = error.error;
            },
          );

        }
      };
    }
  }
}

