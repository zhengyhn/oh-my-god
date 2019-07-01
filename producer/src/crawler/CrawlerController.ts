import { Inject, Singleton } from 'typescript-ioc'
import { CrawlerService } from './CrawlerService'

@Singleton
export class CrawlerController {
  @Inject
  private crawlerService: CrawlerService

  async crawlZhihu (ctx) {
    await this.crawlerService.crawlZhihu()

    ctx.body = { a: 1 }
  }
}
