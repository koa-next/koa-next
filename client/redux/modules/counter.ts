import { AxiosRequestConfig } from 'axios';
import { createAction, handleActions } from 'redux-actions';
import fetch from '../../utils/fetch';
import { createEpics, createObserverable } from '../../utils/observable';

export interface State {
  num: number;
  error: string | null;
}

const initialState: State = {
  num: 0,
  error: null,
};

// actionTypes
const FETCH_COUNTER = 'FETCH_COUNTER';
const FETCH_COUNTER_FAIL = 'FETCH_COUNTER_FAIL';
const FETCH_COUNTER_SUCCESS = 'FETCH_COUNTER_SUCCESS';

// actions
const searchCounterFail = createAction(FETCH_COUNTER_FAIL);
const searchCounterSuccess = createAction(FETCH_COUNTER_SUCCESS);
export const searchCounter = createAction(
  FETCH_COUNTER,
  (payload: KoaNext.IResponse) => payload,
  (_, meta: AxiosRequestConfig) => meta,
);

export type ActionTypes = ReturnType<typeof searchCounter>;

// reducers
const counter = handleActions(
  {
    [FETCH_COUNTER_SUCCESS]: (state, { payload }) => {
      return { ...state, ...payload };
    },
    [FETCH_COUNTER_FAIL]: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
  initialState,
);

export const reducers = {
  counter,
};

// epics
const searchCounterEpics = createEpics(
  FETCH_COUNTER,
  (payload = {}, meta = {}) =>
    fetch('/api/test', {
      body: payload,
      ...meta,
    }),
  res => searchCounterSuccess({ num: res.result }),
  res => searchCounterFail({ error: res.errorMsg }),
);

export const epics = [searchCounterEpics];

export const fetchCounterController = (data = {}, meta = {}) => {
  return createObserverable(
    fetch('/api/test', {
      body: data,
      ...meta,
    }),
  ).toPromise();
};
