import { ObservableInput, of, MonoTypeOperatorFunction } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export const cancel = <T = any>(cb: (d: T) => void): MonoTypeOperatorFunction<any> =>
  tap((data) => {
    if (!data) {
      cb(data);
    }
  });

export const cancelTo = <T = any>(to: (data?: T) => ObservableInput<any>): MonoTypeOperatorFunction<T> =>
  switchMap(data =>
    !data ?
      to(data) :
      of(data)
  );
