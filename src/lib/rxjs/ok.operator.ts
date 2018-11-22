import { ObservableInput, of, MonoTypeOperatorFunction } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export const ok = (cb: Function): MonoTypeOperatorFunction<any> =>
  tap((data) => {
    if (data || (typeof (data) === 'string')) {
      cb(data);
    }
  });

export const okTo = (to: (data?) => ObservableInput<any>): MonoTypeOperatorFunction<any> =>
  switchMap(data => {
    if (data || (typeof (data) === 'string')) {
      return to(data);
    }
    return of(data);
  });
