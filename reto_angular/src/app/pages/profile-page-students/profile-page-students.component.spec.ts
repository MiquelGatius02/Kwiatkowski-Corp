import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageStudentsComponent } from './profile-page-students.component';

describe('ProfilePageStudentsComponent', () => {
  let component: ProfilePageStudentsComponent;
  let fixture: ComponentFixture<ProfilePageStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePageStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
