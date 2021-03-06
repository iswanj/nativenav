import { combineReducers } from "redux";

import app from "./app";

const appReducer = combineReducers({
  app
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
