import { TestBed, inject } from '@angular/core/testing';

import { MeliService } from './meli.service';

describe('MeliService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeliService]
    });
  });

  it('should be created', inject([MeliService], (service: MeliService) => {
    expect(service).toBeTruthy();
  }));
});
