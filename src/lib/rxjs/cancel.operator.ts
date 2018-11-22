import { ObservableInput, of, MonoTypeOperatorFunction } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export const cancel = (cb: Function): MonoTypeOperatorFunction<any> =>
  tap((data) => {
    if (!data) {
      cb(data);
    }
  });

export const cancelTo = (to: (data?) => ObservableInput<any>): MonoTypeOperatorFunction<any> =>
  switchMap(data => {
    if (!data) {
      return to(data);
    }
    return of(data);
  });
