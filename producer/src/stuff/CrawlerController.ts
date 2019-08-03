import { Inject, Singleton } from 'typescript-ioc'
import { CrawlService } from './crawl/CrawlService'

@Singleton
export class StuffController {
  @Inject
  private crawlService: CrawlService

  async crawl (ctx) {
    const platform = ctx.params['platform']
    await this.crawlService.crawl(platform)
    ctx.body = {}
  }
}
