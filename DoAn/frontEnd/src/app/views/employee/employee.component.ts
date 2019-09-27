import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../models/employee';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { PnotifyService } from './../../utils/pnotify.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  employees: [Employee];
  employee: Employee = { id: 0} as Employee;
  constructor(private router: Router, private pNotifyService: PnotifyService,
    private employeeService: EmployeeService) { }
  ngOnInit() {
    this.loadData();
  }
  private loadData() {
    this.employeeService.list().subscribe( res => {
      this.employees = res.data;
  });
  }
  openAdd() {
    // this.router.navigate(['/customer-type', 0]);
    this.employee = { id: 0} as Employee ;
    this.editModal.show();
  }
  openEdit(event, id) {
    event.preventDefault();
    this.employeeService.get(id).subscribe(res => {
      this.employee = res.data;
      this.editModal.show();
    });
  }
  delete(event, id) {
    event.preventDefault();
    this.pNotifyService.confirm('Confirm', 'Are you sure?', yes => {
      if (yes) {
        this.employeeService.delete(id).subscribe(res => {
          if (res.errorCode === 0) {
            this.loadData();
          }
        });
      }
    });
  }

  // modals
  hideModal() {
    this.editModal.hide();
  }
  save() {
    this.employeeService.save(this.employee).subscribe( res => {
      if (res.errorCode === 0) {
        this.pNotifyService.success('Info', 'Save successful');
        this.editModal.hide();
        this.loadData();
      } else {
        this.pNotifyService.error('Error', 'Save failed');
      }
    }, err => {
      this.pNotifyService.error('Error', 'Save failed');
    });
  }
}
