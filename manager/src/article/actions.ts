import { ActionType, ReplyItem, ICreateArticleBody } from "./types";
import { string } from "prop-types";

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
  }
};
