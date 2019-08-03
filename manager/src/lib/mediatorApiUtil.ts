import { constant } from "../lib";
import commonApiUtil from "./commonApiUtil";

export default {
  async get({
    url,
    param,
    header
  }: {
    url: string;
    param?: any;
    header?: any;
  }) {
    let uri = `${constant.MEDIATOR_API_URL}${url}`;
    const response = await commonApiUtil.get({ url: uri, header, param });
    if (response.code !== 0) {
      throw new Error(response.message);
    }
    return response.data;
  },

  async post({ url, body }: { url: string; body: any }) {
    const response = await commonApiUtil.post({
      url: `${constant.MEDIATOR_API_URL}${url}`,
      body
    });
    if (response.code !== 0) {
      throw new Error(response.message);
    }
    return response.data;
  }
};
