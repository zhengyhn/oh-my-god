import { IState } from "../types";
import { IAction } from "../../lib/types";
import { cloneDeep } from "lodash";

export abstract class AbstractReducer {
  reduce(state: IState, action: IAction): IState {
    return this.getNewState(cloneDeep(state), action.data);
  }

  abstract getNewState(state: IState, data: any): IState;
}
