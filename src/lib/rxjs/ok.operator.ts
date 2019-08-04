import { ObservableInput, of, MonoTypeOperatorFunction } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export const ok = <T = any>(cb: (d: T) => void): MonoTypeOperatorFunction<any> =>
  tap((data) => {
    if (data || (typeof (data) === 'string')) {
      cb(data);
    }
  });

export const okTo = <T = any>(to: (data?: T) => ObservableInput<T>): MonoTypeOperatorFunction<T> =>
  switchMap(data =>
    data || (typeof (data) === 'string') ?
      to(data) :
      of(data)
  );
