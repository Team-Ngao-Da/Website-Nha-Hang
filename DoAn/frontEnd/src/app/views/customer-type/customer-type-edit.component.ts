import { PnotifyService } from './../../utils/pnotify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerTypeService } from '../../services/customer-type.service';
import { CustomerType } from '../../models/customer-type';

@Component({
  selector: 'app-customer-type-edit',
  templateUrl: './customer-type-edit.component.html',
  styleUrls: ['./customer-type-edit.component.scss']
})
export class CustomerTypeEditComponent implements OnInit {
  id: string;
  customerType: CustomerType = { id: 0} as CustomerType;
  constructor(private activeRoute: ActivatedRoute, private router: Router,
              private customerTypeService: CustomerTypeService,
              private pNotifyService: PnotifyService) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');

    if (this.id !== '0') {
      this.customerTypeService.get(this.id).subscribe( res => {
        this.customerType = res.data;
      });
    }
  }

  ngOnInit() {
  }

  save() {
    this.customerTypeService.save(this.customerType).subscribe( res => {
      if (res.errorCode === 0) {
        this.pNotifyService.success('Info', 'Save successful');
        this.router.navigate(['/customer-type']);
      } else {
        this.pNotifyService.error('Error', 'Save failed');
      }
    }, err => {
      this.pNotifyService.error('Error', 'Save failed');
    });
  }
}
