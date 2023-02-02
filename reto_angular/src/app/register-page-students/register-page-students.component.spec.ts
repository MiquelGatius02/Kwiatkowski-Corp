import { ComponentFixture, TestBed } from '@angular/core/testing';

import { registerPageStudentsComponent } from './register-page-students.component';

describe('registerPageComponent', () => {
  let component: registerPageStudentsComponent;
  let fixture: ComponentFixture<registerPageStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ registerPageStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(registerPageStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
