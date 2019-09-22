import { AbstractReducer } from "./AbstractReducer";

export class GetSelectedRepliesSuccessReducer extends AbstractReducer {
  getNewState(state: any, data: any): any {
    let list;
    if (data.currentPage === 1) {
      list = data.list;
    } else {
      list = [...state.list, ...data.list];
    }
    return { ...state, list };
  }
}
