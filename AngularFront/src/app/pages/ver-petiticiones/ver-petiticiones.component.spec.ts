import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPetiticionesComponent } from './ver-petiticiones.component';

describe('VerPetiticionesComponent', () => {
  let component: VerPetiticionesComponent;
  let fixture: ComponentFixture<VerPetiticionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPetiticionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPetiticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
