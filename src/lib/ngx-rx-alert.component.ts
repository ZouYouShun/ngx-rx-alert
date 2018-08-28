import { Component, HostListener, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxRxModalRef, NGX_RX_MODAL_TOKEN } from 'ngx-rx-modal';
import { NgxRxAlertModel, DIALOG_TYPE } from './ngx-rx-alert.model';

interface InputData {
  data: NgxRxAlertModel;
  type: DIALOG_TYPE;
}

@Component({
  selector: 'ngx-rx-alert',
  templateUrl: './ngx-rx-alert.component.html',
  styleUrls: ['./ngx-rx-alert.component.scss']
})
export class NgxRxAlertComponent implements NgxRxModalRef {
  complete = new Subject();

  message = '';

  isConfirm = false;

  data: NgxRxAlertModel;

  classList = {
    success: {
      icon: 'check_circle', // cycle ˇ
      class: 'c-green'
    },
    warning: {
      icon: 'warning', // triangle !
      class: 'c-yellow'
    },
    info: {
      icon: 'info',  // cycle !
      class: 'c-accent'
    },
    error: {
      icon: 'highlight_off',  // cycle x
      class: 'c-warn'
    }
  };

  @HostListener('document:keydown.escape') // , ['$event']
  onKeydownHandler() { // evt: KeyboardEvent
    this.cancel();
  }

  constructor(@Inject(NGX_RX_MODAL_TOKEN) source: InputData) {
    this.data = {
      ...source.data,
      type: source.data.type || 'info'
    };

    this.isConfirm = source.type === DIALOG_TYPE.CONFIRM;
  }

  ok() {
    if (this.data.hasInput) {
      return this.complete.next(this.message);
    }
    this.complete.next(true);
  }

  cancel() {
    this.complete.next(false);
  }
}
