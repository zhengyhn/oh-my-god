import { Inject, Singleton } from 'typescript-ioc'
import { Puppeteer } from '../../../lib'
import { IFetchReplyResult } from './IFetchReplyResult'

export abstract class AbstractCrawler {
  @Inject
  protected puppeteer: Puppeteer

  async crawl () {
    await this.puppeteer.launch()
    let links = await this.getStartPointLinks()
    console.log(links)
    let replies = []
    while (links.length > 0) {
      const link = links.splice(0, 1)[0]
      const result: IFetchReplyResult = await this.fetchContent(link)
      links = [...links, ...result.newLinks]
      replies = [...replies, ...result.items]
    }
    console.log(replies)
  }

  abstract getStartPointLinks (): Promise<string[]>
  abstract fetchContent (link: string): Promise<IFetchReplyResult>
}
