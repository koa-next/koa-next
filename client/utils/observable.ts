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
import { AxiosError, AxiosRequestConfig } from 'axios';
import { Action } from 'redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { from, merge, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  partition,
  share,
  tap,
} from 'rxjs/operators';
import { ActionTypes } from '../redux/modules';
import { isNode } from './env';
import { observable as logger } from './logger';

// http 非 200 错误处理
const globalError = (err: AxiosError): KoaNext.IResponse => {
  if (isNode) {
    logger.error(err.response?.data && JSON.stringify(err.response.data));
    logger.error(err.response?.headers && JSON.stringify(err.response.headers));
    logger.error(err.message);
    logger.error(err.config && JSON.stringify(err.config));
  }

  return {
    success: false,
    errorMsg: err.message,
  };
};

// http 200 success false 错误处理
const requestError = (res: KoaNext.IResponse) => {
  const errorMsg = res.errorMsg || '接口错误';
  if (isNode) {
    logger.error(JSON.stringify(res));
  } else {
    message.error(errorMsg);
  }
};

const createEpics = (
  actionType: string,
  createPromise: (
    payload: KoaNext.IBody,
    meta: AxiosRequestConfig,
  ) => Promise<KoaNext.IResponse>,
  successAction: (res: KoaNext.IResponse) => Action<any>,
  errorAction: (res: KoaNext.IResponse) => Action<any>,
  globalErr = globalError,
) => (action$: ActionsObservable<ActionTypes>) =>
  action$.pipe(
    ofType(actionType),
    mergeMap(action => {
      const [succ$, err$] = partition<KoaNext.IResponse>(x => x.success)(
        from(createPromise(action.payload, action.meta)).pipe(
          catchError(err => {
            return of(globalErr(err));
          }),
          share(),
        ),
      );

      return merge(
        succ$.pipe(
          tap(x => isNode && logger.info(JSON.stringify(x))),
          map(x => successAction(x)),
        ),
        err$.pipe(
          tap(x => requestError(x)),
          map(x => errorAction(x)),
        ),
      );
    }),
  );

const createObserverable = (
  promise: Promise<KoaNext.IResponse>,
  globalErr = globalError,
) => {
  return from(promise).pipe(
    catchError(err => {
      return of(globalErr(err));
    }),
    tap(x => !x.success && requestError(x)),
  );
};

export { createEpics, createObserverable };
