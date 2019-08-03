import { AbstractReducer } from "./AbstractReducer";
import { IState } from "../types";

export class DefaultReducer extends AbstractReducer {
  getNewState(state: IState, data: any): IState {
    return state;
  }
}
