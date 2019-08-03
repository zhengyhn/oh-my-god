import { ActionType } from "./types";

export default {
  replyList: ({
    currentPage,
    currentPageSize,
    query
  }: {
    currentPage: number;
    currentPageSize: number;
    query: any;
  }) => {
    return {
      type: ActionType[ActionType.REPLY_LIST],
      param: { currentPage, currentPageSize, query }
    };
  },

  transform: ({ id, status }: { id: number; status: string }) => {
    return { type: ActionType[ActionType.TRANSFORM], body: { id, status } };
  },

  getImageBase64: ({
    url,
    reply
  }: {
    url: string;
    reply: string;
  }) => {
    return {
      type: ActionType[ActionType.GET_IMAGE_BASE64],
      param: { url, reply }
    };
  }
};
