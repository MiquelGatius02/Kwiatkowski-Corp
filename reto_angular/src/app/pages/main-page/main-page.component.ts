import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cat } from 'src/app/models/cat.model';
import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private catserv: CatService) { }

  cats: Cat[] | undefined; // Almacenar los gatos
  total: number[] = [5, 10, 15, 20, 25]; // Número de gatos que se mostrarán
  limite: any; // Limitador

  valor = new FormGroup({
    limite: new FormControl('1', [Validators.required])
  });

  searchCats(): void { // Variable responsable por la busqueda de gatos
    const minim: string | null = this.valor.controls['limite'].value;
    this.catserv.getCats(minim).subscribe({
      next: (value: Cat[]) => {
        this.cats = []; this.cats = value;
        console.log(value);
      }
    });
  }

}
