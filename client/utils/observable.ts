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

import { message } from 'antd';
import { ofType } from 'redux-observable';
import { of, from, merge } from 'rxjs';
import { partition, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { isNode } from './env';
import logger from './logger';

// http 非 200 错误处理
const globalError = (res) => {
  if (isNode) {
    logger.error(`globalError: ${res && res.statusText}`);
  }

  return {
    success: false,
    errorMsg: res && res.statusText
  };
};

// http 200 success false 错误处理
const requestError = (res) => {
  const errorMsg = res.errorMsg || '接口错误'
  if (isNode) {
    logger.error(`${errorMsg}`);
  } else {
    message.error(errorMsg);
  }
}

const createEpics = (
  actionType,
  createPromise,
  successAction,
  errorAction,
  globalErr = globalError
) => (action$: any) =>
  action$.pipe(
    ofType(actionType),
    mergeMap((action: any) => {
      const [succ$, err$] = partition((x: any) => x.success)(
        from(createPromise(action.payload, action.meta)).pipe(
          catchError(err => {
            return of(globalErr(err));
          })
        )
      );

      return merge(
        succ$.pipe(
          map(x => successAction(x))
        ),
        err$.pipe(
          tap(x => requestError(x)),
          map(x => errorAction(x))
        )
      );
    })
  );

const createObserverable = (promise, globalErr = globalError) => {
  return from(promise).pipe(
    catchError(err => {
      return of(globalErr(err));
    })
  );
};

export { createEpics, createObserverable };
