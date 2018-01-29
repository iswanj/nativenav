import {
  SET_STATE,
  CLEAR_STATE,
  SET_ERROR,
  CLEAR_ERROR,
  ROOT_CHANGED
} from "constant/app";

function setState(state, newState) {
  return { ...state, ...newState };
}

function clearState() {
  return {};
}

export default function(state = {}, action) {
  switch (action.type) {
    case SET_STATE:
      return setState(state, action.state);
    case CLEAR_STATE:
      return clearState();
    case SET_ERROR:
      return { ...state, error: action.data };
    case CLEAR_ERROR:
      return { ...state, error: "" };
    case ROOT_CHANGED:
      return { ...state, root: action.root };
    default:
      return state;
  }
}
