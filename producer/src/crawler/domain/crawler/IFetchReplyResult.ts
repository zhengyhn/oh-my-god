export type IFetchReplyResult = {
  newLinks: string[]
  items: IReplyItem[]
}

export type IReplyItem = {
  url: string
  title: string,
  reply: string,
  up: number,
  author: string
}
