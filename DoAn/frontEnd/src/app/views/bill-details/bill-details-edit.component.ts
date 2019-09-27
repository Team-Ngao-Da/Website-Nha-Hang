import { PnotifyService } from './../../utils/pnotify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillDetailsService } from '../../services/bill_details.service';
import { BillDetails } from '../../models/bill_details';

@Component({
  selector: 'app-bill-details-edit',
  templateUrl: './bill-details-edit.component.html',
  styleUrls: ['./bill-details-edit.component.scss']
})
export class BillDetailsEditComponent implements OnInit {
  B_ID: string;
  billDetails: BillDetails = { B_ID: 0 } as BillDetails;
  constructor(private activeRoute: ActivatedRoute, private router: Router,
              private billDetailsService: BillDetailsService,
              private pNotifyService: PnotifyService) {
    this.B_ID = this.activeRoute.snapshot.paramMap.get('B_ID');

    if (this.B_ID !== '0') {
      this.billDetailsService.get(this.B_ID).subscribe( res => {
        this.billDetails = res.data;
      });
    }
  }

  ngOnInit() {
  }

  save() {
    this.billDetailsService.save(this.billDetails).subscribe( res => {
      if (res.errorCode === 0) {
        this.pNotifyService.success('Info', 'Save successful');
        this.router.navigate(['/bill-details']);
      } else {
        this.pNotifyService.error('Error', 'Save failed');
      }
    }, err => {
      this.pNotifyService.error('Error', 'Save failed');
    });
  }
}
