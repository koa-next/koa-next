import { message } from 'antd';
import { createAction, handleActions } from 'redux-actions';
import { createEpics, createObserverable } from '../../utils/observable';
import fetch from '../../../utils/fetch';
import { isNode } from '../../../utils/env';
import logger from '../../../utils/logger';

export interface State {
  num: number;
}

const initialState: State = {
  num: 0
};

// actionTypes
const FETCH_COUNTER = Symbol('FETCH_COUNTER');
const FETCH_COUNTER_FAIL = Symbol('FETCH_COUNTER_FAIL');
const FETCH_COUNTER_SUCCESS = Symbol('FETCH_COUNTER_SUCCESS');

// actions
const searchCounterFail = createAction(FETCH_COUNTER_FAIL);
export const searchCounterSuccess = createAction(FETCH_COUNTER_SUCCESS);
export const searchCounter = createAction(FETCH_COUNTER);

// reducers
const counter = handleActions(
  {
    [FETCH_COUNTER_SUCCESS]: (state, { payload }) => {
      return { ...state, ...payload };
    },
    [FETCH_COUNTER_FAIL]: (state, { payload }) => {
      if (isNode) {
        logger.error(`interface error: ${JSON.stringify(payload)}`);
      } else {
        message.error(payload.errorMsg || '接口错误');
      }
      return { ...state };
    }
  },
  initialState
);

export const reducers = {
  counter
};

// epics
const searchCounterEpics = createEpics(
  FETCH_COUNTER,
  payload =>
    fetch('/test', {
      body: payload
    }),
  x => searchCounterSuccess(x.result),
  x => searchCounterFail(x)
);

export const epics = [searchCounterEpics];

export const fetchCounterController = (data = {}) => {
  return createObserverable(
    fetch('/test', {
      body: data
    })
  ).toPromise();
};
