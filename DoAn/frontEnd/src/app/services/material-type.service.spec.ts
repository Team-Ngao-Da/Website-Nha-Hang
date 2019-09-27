import { TestBed } from '@angular/core/testing';

import { MaterialTypeService } from './material-type.service';

describe('MaterialTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialTypeService = TestBed.get(MaterialTypeService);
    expect(service).toBeTruthy();
  });
});
