import { TestBed } from '@angular/core/testing';

import { PetitionsService } from './services/petitions.service';

describe('PetitionsService', () => {
  let service: PetitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
