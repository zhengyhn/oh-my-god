import { AbstractReducer } from "./AbstractReducer";

export class ListArticleSuccessReducer extends AbstractReducer {
  getNewState(state: any, data: any): any {
    return { ...state, list: data.items, total: data.total };
  }
}
