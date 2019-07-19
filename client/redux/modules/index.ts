import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import {
  reducers as commonReducers,
  epics as commonEpics,
  State as commonState,
} from './common';
import {
  reducers as counterReducers,
  epics as counterEpics,
  State as counterState,
} from './counter';

export interface State {
  counter: counterState;
  common: commonState;
}

export const rootReducers = combineReducers({
  ...counterReducers,
  ...commonReducers,
});

const allEpics = [
  ...counterEpics,
  ...commonEpics,
];

export const rootEpics = combineEpics(...allEpics);
