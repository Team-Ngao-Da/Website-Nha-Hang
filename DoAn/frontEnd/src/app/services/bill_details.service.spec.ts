import { TestBed } from '@angular/core/testing';

import { BillDetailsService } from './bill_details.service';

describe('BillDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillDetailsService = TestBed.get(BillDetailsService);
    expect(service).toBeTruthy();
  });
});
