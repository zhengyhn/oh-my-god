import { AbstractReducer } from "./AbstractReducer";

export class DefaultReducer extends AbstractReducer {
  getNewState(state: any, data: any): any {
    return state;
  }
}
