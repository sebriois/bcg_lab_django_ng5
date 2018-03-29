import { TestBed, inject } from '@angular/core/testing';

import { OutageService } from './outage.service';

describe('OutageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutageService]
    });
  });

  it('should be created', inject([OutageService], (service: OutageService) => {
    expect(service).toBeTruthy();
  }));
});
