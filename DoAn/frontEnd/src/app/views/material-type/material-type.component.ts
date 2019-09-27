import { MaterialTypeService } from './../../services/material-type.service';
import { MaterialType } from './../../models/material-type';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PnotifyService } from '../../utils/pnotify.service';

@Component({
  selector: 'app-material-type',
  templateUrl: './material-type.component.html',
  styleUrls: ['./material-type.component.scss']
})
export class MaterialTypeComponent implements OnInit {

  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  materialTypes: [MaterialType ];
  materialType: MaterialType  = { id: 0} as MaterialType ;
  constructor(private router: Router, private pNotifyService: PnotifyService,
    private materialTypeService: MaterialTypeService) { }

  ngOnInit() {
    this.loadData();
  }
  private loadData() {
    this.materialTypeService.list().subscribe( res => {
      this.materialTypes = res.data;
  });
  }
  openAdd() {
    // this.router.navigate(['/customer-type', 0]);
    this.materialType = { id: 0} as MaterialType;
    this.editModal.show();
  }
  openEdit(event, id) {
    event.preventDefault();
    this.materialTypeService.get(id).subscribe(res => {
      this.materialType = res.data;
      this.editModal.show();
    });
  }
  delete(event, id) {
    event.preventDefault();
    this.pNotifyService.confirm('Confirm', 'Are you sure?', yes => {
      if (yes) {
        this.materialTypeService.delete(id).subscribe(res => {
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
    this.materialTypeService.save(this.materialType).subscribe( res => {
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
