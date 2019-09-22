export enum ActionType {
  GET_SELECTED_REPLIES,
  GET_SELECTED_REPLIES_SUCCESS,
  CREATE_ARTICLE,
  CREATE_ARTICLE_SUCCESS,
  LIST_ARTICLE,
  LIST_ARTICLE_SUCCESS,
  GET_ARTICLE_DETAIL,
  GET_ARTICLE_DETAIL_SUCCESS,
  REFRESH_CONTENT
}

export type ReplyItem = {
  id: number;
  title: string;
  reply: string;
  checked: boolean;
};

export type ICreateArticleState = {
  list: ReplyItem[];
  content: string;
  selectedReplyIds: number[];
};

export type ICreateArticleBody = {
  title: string;
  description: string;
  replyIds: number[];
};

export type IArticleItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  replies: ReplyItem[];
};

export type IListArticleState = {
  list: IArticleItem[];
  total: number;
};

export type IListArticleParam = {
  currentPage: number;
  currentPageSize: number;
};

export type IGetArticleDetailState = {
  article: IArticleItem;
};
