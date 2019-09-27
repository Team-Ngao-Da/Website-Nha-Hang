import { TestBed } from '@angular/core/testing';

import { TableDetailService } from './table-detail.service';

describe('TableDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableDetailService = TestBed.get(TableDetailService);
    expect(service).toBeTruthy();
  });
});
