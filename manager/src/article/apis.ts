import { mediatorApiUtil } from "../lib";
import { ICreateArticleBody } from "./types";

export default {
  async createArticle(param: ICreateArticleBody) {
    return await mediatorApiUtil.post({
      url: "/article/add",
      body: param
    });
  }
};
