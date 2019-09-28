import { MenuType } from './../../models/menu-type';
import { MenuTypeService } from './../../services/menu-type.service';
import { MenuService } from './../../services/menu.service';
import { Menu } from './../../models/menu';
import { ListItem } from './../../models/list-item';
import { PnotifyService } from './../../utils/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Page } from './../../models/page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  menuTypes: ListItem[] = [];
  menus: Menu [] = [];
  menu: Menu = {id: 0} as Menu ;
  menuTypeId: number = 0;
  page = {pageNumber: 0, pageSize: 3} as Page;
  form: FormGroup;
  public keyword: string;
  constructor(private menuTypeService: MenuTypeService,
    private fb: FormBuilder,
    private menuService: MenuService, private pNotifyService: PnotifyService) {
      this.menuTypeService.list().subscribe(res => {
        this.menuTypes = res.data.map( x => ({value: x.id, name: x.name}));
      });
    this.form = this.fb.group({
      MT_ID: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      price: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadMenu();
  }
  openAdd() {
    this.menu = {id: 0} as Menu;
    this.editModal.show();
  }
  openEdit(id: number) {
    this.menuService.get(id).subscribe(res => {
      this.menu = res.data;
      this.editModal.show();
    });
  }
  search() {
    this.menuService.search(this.keyword).subscribe(res => {
      this.menus = res.data;
      console.log(this.keyword);
      console.log(res.data);
    });

  }
  delete(id: number) {
    this.pNotifyService.confirm('Confirm', 'Are you sure?', yes => {
      if (yes) {
        this.menuService.delete(id).subscribe(res => {
          if (res.errorCode === 0) {
            this.page.pageNumber = 0; // load first page
            this.loadMenu();
          }
        });
      }
    });
  }
  loadMenu(page = null) {
    if (page != null) {
      this.page.pageNumber = page.offset;
    }
  // tslint:disable-next-line: triple-equals
  if (this.menuTypeId == 0) {
    this.menuService.list(this.page).subscribe(res => {
      this.page = res.pageInfo;
      this.menus = res.data;
    });
  } else {
    this.menuService.listByMenuType(this.menuTypeId, this.page).subscribe(res => {
      this.page = res.pageInfo;
      this.menus = res.data;
    });
  }
}
  hideModal() {
    this.editModal.hide();
  }
  save() {
    this.menuService.save(this.menu).subscribe( res => {
      if (res.errorCode === 0) {
        this.pNotifyService.success('Info', 'Save successful');
        this.editModal.hide();
        this.loadMenu();
      } else {
        this.pNotifyService.error('Error', 'Save failed');
      }
    }, err => {
      this.pNotifyService.error('Error', 'Save failed');
    });
  }
}
