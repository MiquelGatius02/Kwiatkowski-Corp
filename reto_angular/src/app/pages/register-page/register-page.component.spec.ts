import { ComponentFixture, TestBed } from '@angular/core/testing';

import { registerPageComponent } from './register-page.component';

describe('registerPageComponent', () => {
  let component: registerPageComponent;
  let fixture: ComponentFixture<registerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ registerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(registerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
