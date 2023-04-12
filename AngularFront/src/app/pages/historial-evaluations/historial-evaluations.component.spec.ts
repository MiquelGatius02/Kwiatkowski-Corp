import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialEvaluationsComponent } from './historial-evaluations.component';

describe('HistorialEvaluationsComponent', () => {
  let component: HistorialEvaluationsComponent;
  let fixture: ComponentFixture<HistorialEvaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialEvaluationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
