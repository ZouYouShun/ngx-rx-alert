import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export const cancel = (cb: Function) =>
  tap((data) => {
    if (!data) {
      cb(data);
    }
  });

export const cancelTo = (to: (data?) => Observable<any>) =>
  switchMap(data => {
    if (!data) {
      return to(data);
    }
    return of(data);
  });
