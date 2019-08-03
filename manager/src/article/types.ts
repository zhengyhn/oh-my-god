export enum ActionType {
  GET_SELECTED_REPLIES,
  GET_SELECTED_REPLIES_SUCCESS,
  CREATE_ARTICLE,
  CREATE_ARTICLE_SUCCESS,
  REFRESH_CONTENT
}

export type ReplyItem = {
  id: number;
  title: string;
  reply: string;
  checked: boolean;
};

export type IState = {
  list: ReplyItem[];
  content: string;
  selectedReplyIds: number[];
};

export type ICreateArticleBody = {
  title: string;
  description: string;
  replyIds: number[];
};
