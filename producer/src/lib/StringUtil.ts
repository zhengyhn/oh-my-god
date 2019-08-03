import { Singleton } from "typescript-ioc";
import * as lodash from "lodash";

@Singleton
export class StringUtil {
  isAllNumber(str: string): boolean {
    return lodash.every(str, item => item >= "0" && item <= "9");
  }

  htmlToText(html): string {
    let text = html.replace(/<p>/g, "\n");
    return text.replace(/<[^>]*>/g, "");
  }
}
