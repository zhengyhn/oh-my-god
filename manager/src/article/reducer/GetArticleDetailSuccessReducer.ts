import { AbstractReducer } from "./AbstractReducer";

export class GetArticleDetailSuccessReducer extends AbstractReducer {
  getNewState(state: any, data: any): any {
    return { ...state, article: data };
  }
}
