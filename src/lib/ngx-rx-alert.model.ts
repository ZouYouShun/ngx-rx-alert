export class NgxRxAlertModel {
  constructor(
    public title: string,
    public message: string,
    public type: 'success' | 'warning' | 'info' | 'error' = 'info',
    public disableClose?: boolean,
    public hasInput?: boolean,
    public inputType: 'input' | 'textarea' = 'textarea'
  ) {
  }
}

export const enum DIALOG_TYPE {
  ALERT,
  CONFIRM
}

export interface NgxRxAlertOption {
  noRedirect?: boolean;
}
