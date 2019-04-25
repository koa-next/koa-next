/**
 * // status = 2xx, success: true;
 * {
 *    success: true,
 *    result: {
 *      a: 1
 *    }
 * }
 *
 * // status = 2xx, success: false;
 * {
 *    errorMsg: "xxxx"
 *    success: false
 * }
 *
 * // status != 2xx, return object built by myself
 * {
 *    errorMsg: res.statusText
 *    success: false
 * }
 *
 */

import { ofType } from 'redux-observable';
import { of, from, merge } from 'rxjs';
import { partition, map, catchError, mergeMap } from 'rxjs/operators';
import { isNode } from './env';
import logger from './logger';

const GlobalError = (res) => {
  if (isNode) {
    logger.error(`globalError: ${res && res.statusText}`);
  }

  return {
    success: false,
    errorMsg: res && res.statusText
  };
};

const createEpics = (
  actionType,
  createPromise,
  successAction,
  errorAction,
  globalError = GlobalError
) => (action$: any) =>
  action$.pipe(
    ofType(actionType),
    mergeMap((action: any) => {
      const [succ$, err$] = partition((x: any) => x.success)(
        from(createPromise(action.payload)).pipe(
          catchError(err => {
            return of(globalError(err));
          })
        )
      );

      return merge(
        succ$.pipe(
          map(x => {
            return successAction(x);
          })
        ),
        err$.pipe(
          map(x => {
            return errorAction(x);
          })
        )
      );
    })
  );

const createObserverable = (promise, globalError = GlobalError) => {
  return from(promise).pipe(
    catchError(err => {
      return of(globalError(err));
    })
  );
};

export { createEpics, createObserverable };
