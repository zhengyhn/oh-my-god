import { combineReducers } from "redux";
import {
  ICreateArticleState,
  IListArticleState,
  IGetArticleDetailState
} from "../types";
import { IAction } from "../../lib/types";
import { ReducerFactory } from "./ReducerFactory";

const initialCreateArticleState: ICreateArticleState = {
  list: [],
  content: "",
  selectedReplyIds: []
};

function createReducer(state = initialCreateArticleState, action: IAction) {
  return new ReducerFactory()
    .getCreateReducer(action.type)
    .reduce(state, action);
}

const initialListArticleState: IListArticleState = {
  list: [],
  total: 0
};

function listReducer(state = initialListArticleState, action: IAction) {
  return new ReducerFactory().getListReducer(action.type).reduce(state, action);
}

const initialGetArticleDetailState: IGetArticleDetailState = {
  article: {
    id: "",
    title: "",
    description: "",
    date: "",
    replies: []
  }
};

function detailReducer(state = initialGetArticleDetailState, action: IAction) {
  return new ReducerFactory()
    .getDetailReducer(action.type)
    .reduce(state, action);
}

export default combineReducers({
  create: createReducer,
  list: listReducer,
  detail: detailReducer
});
