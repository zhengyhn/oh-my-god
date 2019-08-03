import { ActionType, ReplyItem } from "./types";
import { IAction } from "../lib/types";
import { remove, cloneDeep } from "lodash";

const initialState = {
  list: [],
  total: 0
};

export default function reducer(state = initialState, action: IAction) {
  console.log(action);
  let newState;
  switch (action.type) {
    case ActionType[ActionType.REPLY_LIST_SUCCESS]:
      newState = { ...state, list: action.data.list, total: action.data.total };
      break;
    case ActionType[ActionType.TRANSFORM_SUCCESS]:
      const {id} = action.data
      newState = cloneDeep(state);
      remove(newState.list, (item: ReplyItem) => item.id === id)
      break;
    default:
      newState = state;
      break;
  }
  return newState;
}
