import axios from "axios";
import querystring from "querystring";
import { isEmpty } from "lodash";
import util from "./util";

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
    let uri = url;
    if (!isEmpty(param)) {
      const query = querystring.stringify(util.removeEmptyEntry(param));
      uri += `?${query}`;
    }
    const response = await axios.get(uri, {
      headers: header
    });
    if (!response || !response.data) {
      throw new Error("No response");
    }
    return response.data;
  },

  async post({url, body}: {url: string, body: any}) {
    const response = await axios.post(url, body);
    if (!response || !response.data) {
      throw new Error("No response");
    }
    return response.data;
  }
};
