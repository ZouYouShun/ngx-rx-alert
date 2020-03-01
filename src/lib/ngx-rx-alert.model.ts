import { ValidatorFn } from '@angular/forms';

export class NgxRxAlertModel {
  constructor(
    public title: string,
    public message: string,
    public type: 'success' | 'warning' | 'info' | 'error' = 'info',
    public disableClose?: boolean,
    public hasInput?: boolean,
    public inputType: 'input' | 'textarea' = 'textarea',
    public inputValidator: ValidatorFn | ValidatorFn[] | null = null,
  ) {}
}

export const enum DIALOG_TYPE {
  ALERT,
  CONFIRM,
}

export interface NgxRxAlertOption {
  noRedirect?: boolean;
  backdropStyle?: any;
}
