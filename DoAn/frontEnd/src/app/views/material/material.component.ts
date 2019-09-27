
import { MaterialTypeService } from './../../services/material-type.service';
import { MaterialService } from './../../services/material.service';
import { Material } from './../../models/material';
import { ListItem } from './../../models/list-item';
import { PnotifyService } from './../../utils/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Page } from './../../models/page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  materialTypes: ListItem[] = [];
  materials: Material[] = [];
  material: Material = {id: 0} as Material;
  materialTypeId: number = 0;
  page = {pageNumber: 0, pageSize: 3} as Page;
  form: FormGroup;
  constructor(private materialTypeService: MaterialTypeService,
    private fb: FormBuilder,
    private materialService: MaterialService,
     private pNotifyService: PnotifyService) {
      this.materialTypeService.list().subscribe(res => {
        this.materialTypes = res.data.map( x => ({value: x.id, name: x.name}));
      });
    this.form = this.fb.group({
      MA_T_ID: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      supplie: ['', Validators.required],
      unit: ['', Validators.required],
      count: ['', Validators.required],
      cost: ['', Validators.required],
      expirationDate: ['', Validators.required],
      importDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadMaterial();
  }
  openAdd() {
    this.material = {id: 0} as Material;
    this.editModal.show();
  }
  openEdit(id: number) {
    this.materialService.get(id).subscribe(res => {
      this.material = res.data;
      this.editModal.show();
    });
  }
  delete(id: number) {
    this.pNotifyService.confirm('Confirm', 'Are you sure?', yes => {
      if (yes) {
        this.materialService.delete(id).subscribe(res => {
          if (res.errorCode === 0) {
            this.page.pageNumber = 0; // load first page
            this.loadMaterial();
          }
        });
      }
    });
  }
  loadMaterial(page = null) {
      if (page != null) {
        this.page.pageNumber = page.offset;
      }
    // tslint:disable-next-line: triple-equals
    if (this.materialTypeId == 0) {
      this.materialService.list(this.page).subscribe(res => {
        this.page = res.pageInfo;
        this.materials = res.data;
      });
    } else {
      this.materialService.listByMaterialType(this.materialTypeId, this.page).subscribe(res => {
        this.page = res.pageInfo;
        this.materials = res.data;
      });
    }
  }
  hideModal() {
    this.editModal.hide();
  }
  save() {
    this.materialService.save(this.material).subscribe( res => {
      if (res.errorCode === 0) {
        this.pNotifyService.success('Info', 'Save successful');
        this.editModal.hide();
        this.loadMaterial();
      } else {
        this.pNotifyService.error('Error', 'Save failed');
      }
    }, err => {
      this.pNotifyService.error('Error', 'Save failed');
    });
  }
}
