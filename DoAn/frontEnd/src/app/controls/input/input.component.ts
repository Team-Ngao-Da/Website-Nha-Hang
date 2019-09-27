import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() formControl: any;
  @Input() id: String = '';
  @Input() type: String = 'text';
  @Input() maxlength: Number = 32767;
  @Input() placeholder: string;
  data: string;
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() get ngModel() {
    return this.data;
  }
  set ngModel(value) {
    this.data = value;
    this.ngModelChange.emit(this.data);
  }
  // validations
  @Input() emailValidation: boolean = false;
  @Input() requiredValidation: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
