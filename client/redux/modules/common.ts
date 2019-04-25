import { createAction, handleActions } from 'redux-actions';

export interface State {
  csrf: string;
}

const initialState: State = {
  csrf: ''
};

// actionTypes
const FETCH_COMMON = Symbol('FETCH_COMMON');

// actions
export const fetchCommon = createAction(FETCH_COMMON);

// reducers
const common = handleActions(
  {
    [FETCH_COMMON]: (state, { payload }) => {
      return { ...state, ...payload };
    }
  },
  initialState
);

export const reducers = {
  common
};
