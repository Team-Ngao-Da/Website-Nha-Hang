import { Component, OnInit } from '@angular/core';
import { CustomerTypeService } from '../../services/customer-type.service';
import { CustomerType } from '../../models/customer-type';
import { Router } from '@angular/router';
import { PnotifyService } from '../../utils/pnotify.service';

@Component({
  selector: 'app-customer-type',
  templateUrl: './customer-type.component.html',
  styleUrls: ['./customer-type.component.scss']
})
export class CustomerTypeComponent implements OnInit {
  customerTypes: [CustomerType];
  constructor(private router: Router, private pNotifyService: PnotifyService,
    private customerTypeService: CustomerTypeService) { }

  ngOnInit() {
    this.loadData();
  }
  private loadData() {
    this.customerTypeService.list().subscribe( res => {
      this.customerTypes = res.data;
  });
  }
  openAdd() {
    this.router.navigate(['/customer-type', 0]);
  }
  delete(event, id) {
    event.preventDefault();
    this.pNotifyService.confirm('Confirm', 'Are you sure?', yes => {
      if (yes) {
        this.customerTypeService.delete(id).subscribe(res => {
          if (res.errorCode === 0) {
            this.loadData();
          }
        });
      }
    });
  }
}
