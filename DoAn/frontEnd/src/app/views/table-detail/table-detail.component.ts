import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PnotifyService } from '../../utils/pnotify.service';
import { TableDetailService } from './../../services/table-detail.service';
import { TableDetail } from './../../models/table-detail';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  tableDetails: [TableDetail];
  tableDetail: TableDetail = { id: 0} as TableDetail;
  constructor(private router: Router, private pNotifyService: PnotifyService,
    private tableDetailService: TableDetailService) { }

  ngOnInit() {
    this.loadData();
  }
  private loadData() {
    this.tableDetailService.list().subscribe( res => {
      this.tableDetails = res.data;
  });
  }
  openAdd() {
    // this.router.navigate(['/customer-type', 0]);
    this.tableDetail = { id: 0} as TableDetail;
    this.editModal.show();
  }
  openEdit(event, id) {
    event.preventDefault();
    this.tableDetailService.get(id).subscribe(res => {
      this.tableDetail = res.data;
      this.editModal.show();
    });
  }
  delete(event, id) {
    event.preventDefault();
    this.pNotifyService.confirm('Confirm', 'Are you sure?', yes => {
      if (yes) {
        this.tableDetailService.delete(id).subscribe(res => {
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
    this.tableDetailService.save(this.tableDetail).subscribe( res => {
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
