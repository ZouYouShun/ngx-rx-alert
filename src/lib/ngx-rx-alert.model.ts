export class NgxRxAlertModel {
  constructor(
    public title: string,
    public message: any,
    public type?: 'success' | 'warning' | 'info' | 'error',
    public disableClose?: boolean,
    public hasInput?: boolean,
    public inputType?: 'input' | 'textarea'
  ) {
    if (!inputType) {
      inputType = 'textarea';
    }
    if (typeof (this.message) === 'object') {
      this.message = this.message.message;
    }
  }
}

export const enum DIALOG_TYPE {
  ALERT,
  CONFIRM
}
