import { IAction } from "../../lib/types";
import { cloneDeep } from "lodash";

export abstract class AbstractReducer {
  reduce(state: any, action: IAction): any {
    return this.getNewState(cloneDeep(state), action.data);
  }

  abstract getNewState(state: any, data: any): any;
}
