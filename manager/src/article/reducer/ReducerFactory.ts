import { DefaultReducer } from "./DefaultReducer";
import { ActionType } from "../types";
import { AbstractReducer } from "./AbstractReducer";
import { GetSelectedRepliesSuccessReducer } from "./GetSelectedRepliesSuccessReducer";
import { RefreshContentReducer } from "./RefreshContentReducer";

export class ReducerFactory {
  private defaultReducer: AbstractReducer = new DefaultReducer();
  private getSelectedRepliesSuccessReducer: AbstractReducer = new GetSelectedRepliesSuccessReducer();
  private refreshContentReducer: AbstractReducer = new RefreshContentReducer();

  getReducer(actionType: string): AbstractReducer {
    switch (actionType) {
      case ActionType[ActionType.GET_SELECTED_REPLIES_SUCCESS]:
        return this.getSelectedRepliesSuccessReducer;
      case ActionType[ActionType.REFRESH_CONTENT]:
        return this.refreshContentReducer;
      default:
        return this.defaultReducer;
    }
  }
}
