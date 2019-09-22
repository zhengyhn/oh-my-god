import { DefaultReducer } from "./DefaultReducer";
import { ActionType } from "../types";
import { AbstractReducer } from "./AbstractReducer";
import { GetSelectedRepliesSuccessReducer } from "./GetSelectedRepliesSuccessReducer";
import { RefreshContentReducer } from "./RefreshContentReducer";
import { ListArticleSuccessReducer } from "./ListArticleSuccessReducer";
import { GetArticleDetailSuccessReducer } from "./GetArticleDetailSuccessReducer";

export class ReducerFactory {
  private defaultReducer: AbstractReducer = new DefaultReducer();
  private getSelectedRepliesSuccessReducer: AbstractReducer = new GetSelectedRepliesSuccessReducer();
  private refreshContentReducer: AbstractReducer = new RefreshContentReducer();
  private listArticleSuccessReducer: AbstractReducer = new ListArticleSuccessReducer();
  private getArticleDetailSuccessReducer: AbstractReducer = new GetArticleDetailSuccessReducer();

  getCreateReducer(actionType: string): AbstractReducer {
    switch (actionType) {
      case ActionType[ActionType.GET_SELECTED_REPLIES_SUCCESS]:
        return this.getSelectedRepliesSuccessReducer;
      case ActionType[ActionType.REFRESH_CONTENT]:
        return this.refreshContentReducer;
      default:
        return this.defaultReducer;
    }
  }

  getListReducer(actionType: string): AbstractReducer {
    switch (actionType) {
      case ActionType[ActionType.LIST_ARTICLE_SUCCESS]:
        return this.listArticleSuccessReducer;
      default:
        return this.defaultReducer;
    }
  }

  getDetailReducer(actionType: string): AbstractReducer {
    switch (actionType) {
      case ActionType[ActionType.GET_ARTICLE_DETAIL_SUCCESS]:
        return this.getArticleDetailSuccessReducer;
      default:
        return this.defaultReducer;
    }
  }
}
