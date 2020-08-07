import { applyMiddleware, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { isNode, isPro } from '../utils/env';
import { rootEpics, rootReducers, State } from './modules';

export let store: Store;

export default function configureStore(initialState: State) {
  const epicMiddleware = createEpicMiddleware();
  const loggerMiddleware = createLogger();

  const middlewares =
    !isPro && !isNode ? [epicMiddleware, loggerMiddleware] : [epicMiddleware];

  const applyedMiddleware = applyMiddleware(...middlewares);

  store = createStore(rootReducers, initialState, applyedMiddleware);

  epicMiddleware.run(rootEpics);

  return store;
}
