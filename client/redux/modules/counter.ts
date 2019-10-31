import { createAction, handleActions } from 'redux-actions';
import { createEpics, createObserverable } from '../../utils/observable';
import fetch from '../../utils/fetch';

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
const searchCounterSuccess = createAction(FETCH_COUNTER_SUCCESS);
export const searchCounter = createAction(
  FETCH_COUNTER,
  (payload = {}) => payload,
  (_, meta = {}) => ({ ...meta })
);

// reducers
const counter = handleActions(
  {
    [FETCH_COUNTER_SUCCESS]: (state, { payload }) => {
      return { ...state, ...payload };
    },
    [FETCH_COUNTER_FAIL]: state => {
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
  (payload = {}, meta = {}) =>
    fetch('/api/test', {
      body: payload,
      ...meta
    }),
  x => searchCounterSuccess(x.result),
  x => searchCounterFail(x)
);

export const epics = [searchCounterEpics];

export const fetchCounterController = (data = {}, meta = {}) => {
  return createObserverable(
    fetch('/api/test', {
      body: data,
      ...meta
    })
  ).toPromise();
};
