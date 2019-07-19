import { createAction, handleActions } from 'redux-actions';

export interface State {
  __: {
    [propName: string]: any;
  };
}

const initialState: State = {
  __: {},
};

// actionTypes
const SET_LOCALES = Symbol('SET_LOCALES');

// actions
export const setLocales = createAction(SET_LOCALES);

// reducers
const common = handleActions(
  {
    [SET_LOCALES]: (state, { payload }) => {
      return { ...state, __: payload };
    },
  },
  initialState
);

export const reducers = {
  common,
};

// epics
export const epics = [];

