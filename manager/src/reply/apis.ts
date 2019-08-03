import { mediatorApiUtil } from "../lib";

export default {
  async replyList(param: any) {
    return await mediatorApiUtil.get({
      url: "/reply/list",
      param: {
        ...param.query,
        page: param.currentPage,
        limit: param.currentPageSize
      }
    });
  },

  async transform({ id, status }: { id: number; status: string }) {
    return await mediatorApiUtil.post({
      url: "/reply/transform",
      body: { id, status }
    });
  },

  async getImageBase64(url: string) {
    return await mediatorApiUtil.get({
      url: "/image/getBase64",
      param: { url }
    });
  }
};
