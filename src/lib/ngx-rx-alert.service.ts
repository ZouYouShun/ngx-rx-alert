import { NgxRxModalService } from 'ngx-rx-modal';

import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { NgxRxAlertModel, DIALOG_TYPE } from './ngx-rx-alert.model';
import { NgxRxAlertComponent } from './ngx-rx-alert.component';

@Injectable({
  providedIn: 'root'
})
export class NgxRxAlertService {

  constructor(
    private _modal: NgxRxModalService,
    private _factory: ComponentFactoryResolver
  ) { }

  confirm(obj: NgxRxAlertModel | string): Observable<any> {
    return this.openDialog(obj, DIALOG_TYPE.CONFIRM);
  }

  alert(obj: NgxRxAlertModel | string): Observable<any> {
    return this.openDialog(obj, DIALOG_TYPE.ALERT);
  }

  private openDialog(obj: NgxRxAlertModel | string, type: DIALOG_TYPE) {
    let _obj: NgxRxAlertModel;

    if (typeof (obj) === 'string') {
      _obj = new NgxRxAlertModel(null, obj);
    } else {
      _obj = <any>obj;
    }
    let animate;
    switch (_obj.type) {
      case 'success':
      case 'info':
        animate = 'zoomIn';
        break;
      case 'warning':
      case 'error':
        animate = 'bounceInDown';
        break;
    }

    const component = this._factory.resolveComponentFactory(NgxRxAlertComponent);

    return Observable.create((observer: Subscriber<any>) => {
      this._modal
        .open(component, {
          data: {
            data: _obj,
            type: type
          },
          disableClose: _obj.disableClose,
          disableCloseButton: true,
          backdropClass: 'backdrop center',
          panelStyle: {
            // height: '50%',
            width: '50%',
          },
          windowAnimate: animate
        })
        .subscribe(result => {
          if (type === DIALOG_TYPE.ALERT) {
            result = true;
          }
          observer.next(result);
          observer.complete();
        });
    });
  }


  changeNomalAlert() {
    if (window) {
      window.alert = (msg) => { this.alert(msg).subscribe(); };
    }
  }
}
