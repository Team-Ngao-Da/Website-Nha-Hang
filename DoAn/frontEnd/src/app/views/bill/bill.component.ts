import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../models/employee';
import { BillService } from './../../services/bill.service';
import { Bill } from './../../models/bill';
import { ListItem } from './../../models/list-item';
import { PnotifyService } from './../../utils/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Page } from './../../models/page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  employees: ListItem[] = [];
  bills: Bill[] = [];
  bill: Bill = {id: 0} as Bill;
  employeeId: number = 0;
  page = {pageNumber: 0, pageSize: 3} as Page;
  form: FormGroup;
  constructor(private employeeService: EmployeeService,
    private fb: FormBuilder,
    private billService: BillService, private pNotifyService: PnotifyService) {
      this.employeeService.list().subscribe(res => {
        this.employees = res.data.map( x => ({value: x.id, name: x.name}));
      });
    this.form = this.fb.group({
      payment: ['', Validators.required],
      date: ['', Validators.required],
      E_ID: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadBill();
  }
  openAdd() {
    this.bill = {id: 0} as Bill;
    this.editModal.show();
  }
  openEdit(id: number) {
    this.billService.get(id).subscribe(res => {
      this.bill = res.data;
      this.editModal.show();
    });
  }
  delete(id: number) {
    this.pNotifyService.confirm('Confirm', 'Are you sure?', yes => {
      if (yes) {
        this.billService.delete(id).subscribe(res => {
          if (res.errorCode === 0) {
            this.page.pageNumber = 0; // load first page
            this.loadBill();
          }
        });
      }
    });
  }
  loadBill(page = null) {
      if (page != null) {
        this.page.pageNumber = page.offset;
      }
    // tslint:disable-next-line: triple-equals
    if (this.employeeId == 0) {
      this.billService.list(this.page).subscribe(res => {
        this.page = res.pageInfo;
        this.bills = res.data;
      });
    } else {
      this.billService.listByCustomerType(this.employeeId, this.page).subscribe(res => {
        this.page = res.pageInfo;
        this.bills = res.data;
      });
    }
  }
  hideModal() {
    this.editModal.hide();
  }
  save() {
    console.log(this.bill);
    this.billService.save(this.bill).subscribe( res => {
      if (res.errorCode === 0) {
        this.pNotifyService.success('Info', 'Save successful');
        this.editModal.hide();
        this.loadBill();
      } else {
        this.pNotifyService.error('Error', 'Save failed');
      }
    }, err => {
      this.pNotifyService.error('Error', 'Save failed');
    });
  }
}
