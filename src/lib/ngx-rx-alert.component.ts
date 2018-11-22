import { Component, HostListener, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxRxModalRef, NGX_RX_MODAL_TOKEN } from 'ngx-rx-modal';
import { NgxRxAlertModel, DIALOG_TYPE } from './ngx-rx-alert.model';
import { DomSanitizer } from '@angular/platform-browser';

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
  @ViewChild('okElm', { read: ElementRef }) okElm: ElementRef;
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

  constructor(
    @Inject(NGX_RX_MODAL_TOKEN) source: InputData,
    private _sanitizer: DomSanitizer
  ) {
    this.data = source.data;
    this.data.message = this._sanitizer.bypassSecurityTrustHtml(this.data.message) as string;

    this.isConfirm = source.type === DIALOG_TYPE.CONFIRM;
  }

  ngAfterViewInit(): void {
    if (this.okElm) {
      this.okElm.nativeElement.focus();
    }
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
