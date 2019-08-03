import { all } from "redux-saga/effects";
import replySaga from "./reply/sagas";
import articleSaga from "./article/sagas";

export default function* rootSaga() {
  yield all([replySaga(), articleSaga()]);
}
