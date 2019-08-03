import { Inject, Singleton } from 'typescript-ioc'
import { CrawlerFactory } from './crawler'

@Singleton
export class CrawlService {
  @Inject
  private crawlerFactory: CrawlerFactory

  async crawl (platform) {
    const instance = this.crawlerFactory.getCrawler(Symbol.for(platform))
    instance.crawl()
  }
}
