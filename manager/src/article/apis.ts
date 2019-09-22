import { mediatorApiUtil } from "../lib";
import { ICreateArticleBody, IListArticleParam } from "./types";

export default {
  async createArticle(param: ICreateArticleBody) {
    return await mediatorApiUtil.post({
      url: "/article/add",
      body: param
    });
  },

  async listArticle(param: IListArticleParam) {
    return await mediatorApiUtil.get({
      url: "/article/list",
      param: {
        page: param.currentPage,
        limit: param.currentPageSize
      }
    });
  },

  async getArticleDetail(param: { articleId: string }) {
    return await mediatorApiUtil.get({
      url: "/article/detail",
      param
    });
  }
};
