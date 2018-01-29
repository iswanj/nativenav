import { applyMiddleware, createStore } from "redux";
import reducers from "../reducers";
import { createLogger, END } from "redux-logger";

import createSagaMiddleware from "redux-saga";

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent; // eslint-disable-line

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true
});

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(
      sagaMiddleware, // saga midleware
      logger // neat middleware that logs actions
    )
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  if (isDebuggingInChrome) {
    window.store = store;
  }

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("../reducers/index").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
