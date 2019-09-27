import { BillDetailsService } from './../../services/bill_details.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { PnotifyService } from './../../utils/pnotify.service';
import { BillDetails } from './../../models/bill_details';
import { Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {
  @ViewChild('editModal', { static: true }) editModal: ModalDirective;
  billDetails: [BillDetails];
  billDetail: BillDetails = { B_ID: 0} as BillDetails;
  constructor(private router: Router, private pNotifyService: PnotifyService,
    private billDetailsService: BillDetailsService) { }

  ngOnInit() {
    this.loadData();
  }
  private loadData() {
    this.billDetailsService.list().subscribe( res => {
      this.billDetails = res.data;
  });
  }
  openAdd() {
    // this.router.navigate(['/customer-type', 0]);
    this.billDetail = { B_ID: 0 } as BillDetails ;
    this.editModal.show();
  }
  openEdit(event, id) {
    event.preventDefault();
    this.billDetailsService.get(id).subscribe(res => {
      this.billDetail = res.data;
      this.editModal.show();
    });
  }
  delete(event, id) {
    event.preventDefault();
    this.pNotifyService.confirm('Confirm', 'Are you sure?', yes => {
      if (yes) {
        this.billDetailsService.delete(id).subscribe(res => {
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
    this.billDetailsService.save(this.billDetail).subscribe( res => {
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
