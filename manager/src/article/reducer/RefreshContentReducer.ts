import { AbstractReducer } from "./AbstractReducer";
import { remove } from "lodash";

export class RefreshContentReducer extends AbstractReducer {
  getNewState(state: any, data: any): any {
    let newState = state;
    const text = `<h3>${data.item.title}</h3>${data.item.reply}`;
    const item: any = newState.list.find(
      (item: any) => item.id === data.item.id
    );
    if (data.checked) {
      newState.content = newState.content + text;
      newState.selectedReplyIds.push(data.item.id);
    } else {
      newState.content = newState.content.replace(text, "");
      remove(
        newState.selectedReplyIds,
        (item: number) => item === data.item.id
      );
    }
    if (item) {
      item.checked = data.checked;
    }
    return newState;
  }
}
