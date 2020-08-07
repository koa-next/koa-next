import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import {
  epics as commonEpics,
  reducers as commonReducers,
  State as commonState,
} from './common';
import {
  ActionTypes as counterActionTypes,
  epics as counterEpics,
  reducers as counterReducers,
  State as counterState,
} from './counter';

export interface State {
  counter: counterState;
  common: commonState;
}

export type ActionTypes = counterActionTypes;

export const rootReducers = combineReducers({
  ...counterReducers,
  ...commonReducers,
});

const allEpics = [...counterEpics, ...commonEpics];

export const rootEpics = combineEpics(...allEpics);
