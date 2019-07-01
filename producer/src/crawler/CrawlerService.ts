import { Inject, Singleton } from 'typescript-ioc'
import { CrawlerType, CrawlerFactory } from './domain/crawler'

@Singleton
export class CrawlerService {
  @Inject
  private crawlerFactory: CrawlerFactory

  async crawlZhihu () {
    const instance = this.crawlerFactory.getCrawler(CrawlerType.ZHIHU)
    await instance.crawl()
  }
}
