import {
  SET_STATE,
  CLEAR_STATE,
  SET_ERROR,
  CLEAR_ERROR,
  ROOT_CHANGED
} from "constant/app";

export function setState(state) {
  return {
    type: SET_STATE,
    state
  };
}

export function clearState() {
  return {
    type: CLEAR_STATE
  };
}

export function setError(data) {
  return {
    type: SET_ERROR,
    data:
      "Unable to connect with the server. Check your internet connection and try again."
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}

export function changeAppRoot(root) {
  return {
    type: ROOT_CHANGED,
    root: root
  };
}
export function appInitialized() {
  changeAppRoot("login");
}

// export function login() {
//   return async function(dispatch, getState) {
//     // login logic would go here, and when it's done, we switch app roots
//     dispatch(changeAppRoot("after-sale"));
//   };
// }
