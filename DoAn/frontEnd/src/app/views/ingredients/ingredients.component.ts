import { IngredientsService } from './../../services/ingredients.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { PnotifyService } from './../../utils/pnotify.service';
import { Ingredients } from './../../models/ingredients';
import { Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  @ViewChild('editModal', { static: true }) editModal: ModalDirective;
  ingredients: [Ingredients];
  ingredient: Ingredients = { MA_ID: 0} as Ingredients;
  constructor(private router: Router, private pNotifyService: PnotifyService,
    private ingredientsService: IngredientsService) { }

  ngOnInit() {
    this.loadData();
  }
  private loadData() {
    this.ingredientsService.list().subscribe( res => {
      this.ingredients = res.data;
  });
  }
  openAdd() {
    // this.router.navigate(['/customer-type', 0]);
    this.ingredient = { MA_ID: 0 } as Ingredients ;
    this.editModal.show();
  }
  openEdit(event, id) {
    event.preventDefault();
    this.ingredientsService.get(id).subscribe(res => {
      this.ingredient = res.data;
      this.editModal.show();
    });
  }
  delete(event, id) {
    event.preventDefault();
    this.pNotifyService.confirm('Confirm', 'Are you sure?', yes => {
      if (yes) {
        this.ingredientsService.delete(id).subscribe(res => {
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
    this.ingredientsService.save(this.ingredient).subscribe( res => {
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
