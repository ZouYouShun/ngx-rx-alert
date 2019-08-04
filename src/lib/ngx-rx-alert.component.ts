import { AfterViewInit, Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NGX_RX_MODAL_TOKEN, NgxRxModalRef } from 'ngx-rx-modal';
import { Subject } from 'rxjs';

import { DIALOG_TYPE, NgxRxAlertModel } from './ngx-rx-alert.model';

interface InputData {
  data: NgxRxAlertModel;
  type: DIALOG_TYPE;
}

@Component({
  selector: 'ngx-rx-alert',
  templateUrl: './ngx-rx-alert.component.html',
  styleUrls: ['./ngx-rx-alert.component.scss']
})
export class NgxRxAlertComponent implements NgxRxModalRef, AfterViewInit {
  @ViewChild('okElm', { read: ElementRef, static: true }) okElm: ElementRef;
  complete = new Subject();

  isRequired = true;

  formGroup: FormGroup = this._fb.group({
    message: ['', []],
  });

  get message() { return this.formGroup.get('message'); }

  isConfirm = false;

  data: NgxRxAlertModel;

  classList = {
    success: {
      icon: 'check_circle', // cycle ˇ
      class: 'text-success'
    },
    warning: {
      icon: 'warning', // triangle !
      class: 'text-warning'
    },
    info: {
      icon: 'info',  // cycle !
      class: 'text-accent'
    },
    error: {
      icon: 'highlight_off',  // cycle x
      class: 'text-danger'
    }
  };

  @HostListener('document:keydown.escape') // , ['$event']
  onKeydownHandler() { // evt: KeyboardEvent
    this.cancel();
  }

  constructor(
    @Inject(NGX_RX_MODAL_TOKEN) source: InputData,
    private _fb: FormBuilder,
    private _sanitizer: DomSanitizer
  ) {
    this.data = source.data;
    this.data.message = this._sanitizer.bypassSecurityTrustHtml(this.data.message) as string;

    this.isConfirm = source.type === DIALOG_TYPE.CONFIRM;

    if (this.data.hasInput) {
      this.message.setValidators(this.data.inputValidator);
    }
  }

  ngAfterViewInit(): void {
    if (this.okElm && !this.data.hasInput) {
      setTimeout(() => {
        this.okElm.nativeElement.focus();
      }, 0);
    }
  }

  ok() {
    if (this.data.hasInput) {
      if (this.formGroup.invalid) {
        return;
      }
      return this.complete.next(this.message.value);
    }
    this.complete.next(true);
  }

  cancel() {
    this.complete.next(false);
  }
}
