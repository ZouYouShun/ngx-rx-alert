import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export const ok = (cb: Function) =>
  tap((data) => {
    if (data || (typeof (data) === 'string')) {
      cb(data);
    }
  });

export const okTo = (to: (data?) => Observable<any>) =>
  switchMap(data => {
    if (data || (typeof (data) === 'string')) {
      return to(data);
    }
    return of(data);
  });
