import { put, call, takeLatest } from "redux-saga/effects";
import { ActionType } from "./types";
import replyApis from "../reply/apis";
import articleApis from "./apis";
import { ReplyStatus } from "../reply/types";

function* getSelectedReplies(action: any) {
  const { currentPage } = action.param;
  try {
    const data = yield call(replyApis.replyList, {
      currentPage,
      currentPageSize: 20,
      query: { status: ReplyStatus[ReplyStatus.SELECTED] }
    });
    yield put({
      type: ActionType[ActionType.GET_SELECTED_REPLIES_SUCCESS],
      data: { list: data.items, currentPage }
    });
  } catch (err) {
    console.log(err);
  }
}

function* createArticle(action: any) {
  try {
    const data = yield call(articleApis.createArticle, action.param);
    yield put({
      type: ActionType[ActionType.CREATE_ARTICLE_SUCCESS],
      data
    });
  } catch (err) {
    console.log(err);
  }
}

function* listArticle(action: any) {
  try {
    const data = yield call(articleApis.listArticle, action.param);
    yield put({
      type: ActionType[ActionType.LIST_ARTICLE_SUCCESS],
      data
    });
  } catch (err) {
    console.log(err);
  }
}

function* getArticleDetail(action: any) {
  console.log(action)
  try {
    const data = yield call(articleApis.getArticleDetail, action.param);
    yield put({
      type: ActionType[ActionType.GET_ARTICLE_DETAIL_SUCCESS],
      data
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* rootSaga() {
  yield takeLatest(
    ActionType[ActionType.GET_SELECTED_REPLIES],
    getSelectedReplies
  );
  yield takeLatest(ActionType[ActionType.CREATE_ARTICLE], createArticle);
  yield takeLatest(ActionType[ActionType.LIST_ARTICLE], listArticle);
  yield takeLatest(ActionType[ActionType.GET_ARTICLE_DETAIL], getArticleDetail);
}
