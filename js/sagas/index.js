import { fork, all } from "redux-saga/effects";
import hello from "./hello";

export default function* rootSaga() {
  yield all([fork(hello)]);
}
