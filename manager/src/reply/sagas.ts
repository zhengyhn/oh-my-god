import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import { ActionType } from "./types";
import apis from "./apis";

function* replyList(action: any) {
  try {
    const data = yield call(apis.replyList, action.param);
    yield put({
      type: ActionType[ActionType.REPLY_LIST_SUCCESS],
      data: { list: data.items, total: data.total }
    });
  } catch (err) {
    console.log(err);
  }
}

function* transform(action: any) {
  try {
    yield call(apis.transform, action.body);
    yield put({
      type: ActionType[ActionType.TRANSFORM_SUCCESS],
      data: action.body
    });
  } catch (err) {
    console.log(err);
  }
}

function* getImageBase64(action: any) {
  const { param } = action;
  try {
    const data = yield call(apis.getImageBase64, param.url);
    yield put({
      type: ActionType[ActionType.GET_IMAGE_BASE64_SUCCESS],
      data: {
        reply: param.reply,
        url: param.url,
        base64: data.base64
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* rootSaga() {
  yield takeLatest(ActionType[ActionType.REPLY_LIST], replyList);
  yield takeLatest(ActionType[ActionType.TRANSFORM], transform);
  yield takeEvery(ActionType[ActionType.GET_IMAGE_BASE64], getImageBase64);
}
