import {
  ActionType,
  ReplyItem,
  ICreateArticleBody,
  IListArticleParam
} from "./types";

export default {
  getSelectedReplies: (param: { currentPage: number }) => {
    return {
      type: ActionType[ActionType.GET_SELECTED_REPLIES],
      param
    };
  },

  refreshContent: (data: { item: ReplyItem; checked: boolean }) => {
    return {
      type: ActionType[ActionType.REFRESH_CONTENT],
      data
    };
  },

  createArticle: (param: ICreateArticleBody) => {
    return {
      type: ActionType[ActionType.CREATE_ARTICLE],
      param
    };
  },

  listArticle: (param: IListArticleParam) => {
    return {
      type: ActionType[ActionType.LIST_ARTICLE],
      param
    };
  },

  getArticleDetail: (param: { articleId: string }) => {
    return {
      type: ActionType[ActionType.GET_ARTICLE_DETAIL],
      param
    };
  }
};
