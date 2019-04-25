import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import {
  reducers as commonReducers,
  State as commonState
} from './common';

import {
  reducers as counterReducers,
  epics as counterEpics,
  State as counterState
} from './counter';

export interface State {
  counter: counterState;
  common: commonState;
}

export const rootReducers = combineReducers({
  ...commonReducers,
  ...counterReducers
});

const allEpics = [...counterEpics];

export const rootEpics = combineEpics(...allEpics);
