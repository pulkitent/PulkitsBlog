import { TestBed, inject } from '@angular/core/testing';

import { BloglistService } from './bloglist.service';

describe('BloglistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BloglistService]
    });
  });

  it('should be created', inject([BloglistService], (service: BloglistService) => {
    expect(service).toBeTruthy();
  }));
});
