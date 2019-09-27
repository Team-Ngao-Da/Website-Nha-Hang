import { MenuTypeService } from './../../services/menu-type.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { PnotifyService } from './../../utils/pnotify.service';
import { MenuType } from './../../models/menu-type';
import { Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-menu-type',
  templateUrl: './menu-type.component.html',
  styleUrls: ['./menu-type.component.scss']
})
export class MenuTypeComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  menuTypes: [MenuType];
  menuType: MenuType = { id: 0} as MenuType;
  constructor(private router: Router, private pNotifyService: PnotifyService,
    private menuTypeService: MenuTypeService) { }

  ngOnInit() {
    this.loadData();
  }
  private loadData() {
    this.menuTypeService.list().subscribe( res => {
      this.menuTypes = res.data;
  });
  }
  openAdd() {
    // this.router.navigate(['/customer-type', 0]);
    this.menuType = { id: 0} as MenuType ;
    this.editModal.show();
  }
  openEdit(event, id) {
    event.preventDefault();
    this.menuTypeService.get(id).subscribe(res => {
      this.menuType = res.data;
      this.editModal.show();
    });
  }
  delete(event, id) {
    event.preventDefault();
    this.pNotifyService.confirm('Confirm', 'Are you sure?', yes => {
      if (yes) {
        this.menuTypeService.delete(id).subscribe(res => {
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
    this.menuTypeService.save(this.menuType).subscribe( res => {
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
