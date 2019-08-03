import { combineReducers } from "redux";
import { IState } from "../types";
import { IAction } from "../../lib/types";
import { ReducerFactory } from "./ReducerFactory";

const initialState: IState = {
  list: [],
  content: "",
  selectedReplyIds: []
};

function createReducer(state = initialState, action: IAction) {
  return new ReducerFactory().getReducer(action.type).reduce(state, action);
}

export default combineReducers({
  create: createReducer
});
