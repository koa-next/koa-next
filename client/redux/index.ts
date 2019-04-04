import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { isPro, isNode } from '../../utils/env';
import { rootEpics, rootReducers } from './modules';

const epicMiddleware = createEpicMiddleware();
let middlewares = [
  epicMiddleware,
];

if (!isPro && !isNode) {
  middlewares = [...middlewares, createLogger({ collapsed: true })];
}

export let store;

export default function configureStore(initialState) {
  const applyedMiddleware = applyMiddleware(...middlewares);

  store = createStore(
    rootReducers,
    initialState,
    compose(
      applyedMiddleware,
      !isPro && !isNode && window.devToolsExtension
        ? window.devToolsExtension() : f => f
    )
  );

  epicMiddleware.run(rootEpics);

  return store;
}

