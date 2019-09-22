import { IOption } from "./types";
import lodash from "lodash";

export default {
  optionsToTextMap<T>(options: IOption<T>[]): Map<T, string> {
    return options.reduce(
      (previousValue: Map<T, string>, currentValue: IOption<T>) => {
        previousValue.set(currentValue.value, currentValue.label);
        return previousValue;
      },
      new Map<T, string>()
    );
  },
  removeEmptyEntry(param: any): any {
    return lodash.pickBy(param, lodash.identity);
  },
  lineBreakToBr(str: string): string {
    return str.replace(/(?:\r\n|\r|\n)/g, "<br>");
  }
};
