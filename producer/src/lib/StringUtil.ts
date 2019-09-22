import { Singleton } from "typescript-ioc";
import * as lodash from "lodash";

@Singleton
export class StringUtil {
  isAllNumber(str: string): boolean {
    return lodash.every(str, item => item >= "0" && item <= "9");
  }

  htmlToText(html): string {
    let text = html.replace(/<br>/g, "\n");
    text = text.replace(/<p>/g, "\n");
    return text.replace(/<[^>]*>/g, "");
  }

  countSubstr(str: string, subStr: string): number {
    let count = 0;
    if (!str || !subStr) {
      return count;
    }
    let i = str.indexOf(subStr);
    while (i >= 0) {
      ++count;
      i = str.indexOf(subStr, i + 1);
    }
    return count;
  }
}
