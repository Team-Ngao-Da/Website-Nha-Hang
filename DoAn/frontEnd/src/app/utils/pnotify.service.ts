import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import PNotifyConfirm from 'pnotify/dist/es/PNotifyConfirm';

@Injectable({
  providedIn: 'root'
})
export class PnotifyService {

  constructor() {
    // tslint:disable-next-line: no-unused-expression
    PNotifyButtons; // Initiate the module. Important!
    // tslint:disable-next-line: no-unused-expression
    PNotifyConfirm;
    PNotify.defaults.styling = 'bootstrap4';
    PNotify.defaults.icons = 'fontawesome4';
  }
  success (title: string, content: string) {
    PNotify.success({
      title: title,
      text: content
    });
  }
  error (title: string, content: string) {
    PNotify.error({
      title: title,
      text: content
    });
  }
  confirm(title: string, content: string, callback: (boolean) => void) {
    const notice = PNotify.notice({
      title: title,
      text: content,
      icon: 'fa fa-question-circle',
      hide: false,
      stack: {
        'dir1': 'down',
        'modal': true,
        'firstpos1': 25
      },
      modules: {
        Confirm: {
          confirm: true
        },
        Buttons: {
          closer: false,
          sticker: false
        },
        History: {
          history: false
        },
      }
    });
    notice.on('pnotify.confirm', function() {
      callback(true);
    });
    notice.on('pnotify.cancel', function() {
      callback(false);
    });
  }
}
