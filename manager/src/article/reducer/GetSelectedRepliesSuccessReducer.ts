import { AbstractReducer } from "./AbstractReducer";
import { IState } from "../types";

export class GetSelectedRepliesSuccessReducer extends AbstractReducer {
  getNewState(state: IState, data: any): IState {
    let list;
    if (data.currentPage === 1) {
      list = data.list;
    } else {
      list = [...state.list, ...data.list];
    }
    return { ...state, list };
  }
}
