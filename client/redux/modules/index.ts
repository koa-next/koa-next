import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import {
  reducers as counterReducers,
  epics as counterEpics,
  State as counterState
} from './counter';

export interface State {
  counter: counterState;
}

export const rootReducers = combineReducers({
  ...counterReducers
});

const allEpics = [...counterEpics];

export const rootEpics = combineEpics(...allEpics);
