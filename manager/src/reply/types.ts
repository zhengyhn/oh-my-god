export enum ActionType {
  REPLY_LIST,
  REPLY_LIST_SUCCESS,
  GET_IMAGE_BASE64,
  GET_IMAGE_BASE64_SUCCESS,
  TRANSFORM,
  TRANSFORM_SUCCESS
}

export type ReplyItem = {
  id: number;
  platform: string;
  title: string;
  up: number;
  reply: string;
  status: string;
};

export enum ReplyStatus {
  SELECTING,
  SELECTED,
  DROPED,
  PUBLISHED
}
export enum PlatformType {
  ZHIHU,
  NETEASE_COMMENT,
  BUDEJIE,
  TIEBA
}
