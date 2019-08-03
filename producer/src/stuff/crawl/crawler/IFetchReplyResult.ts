import { IReplyItem } from '../../../mediator/'

export type IFetchReplyResult = {
  newLinks: string[]
  items: IReplyItem[]
}
