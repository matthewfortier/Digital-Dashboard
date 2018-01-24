import { TestBed, inject } from '@angular/core/testing';

import { DashService } from './dash.service';

describe('DashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashService]
    });
  });

  it('should be created', inject([DashService], (service: DashService) => {
    expect(service).toBeTruthy();
  }));
});
