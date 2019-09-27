import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetailsEditComponent } from './bill-details-edit.component';

describe('BillDetailsEditComponent', () => {
  let component: BillDetailsEditComponent;
  let fixture: ComponentFixture<BillDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
