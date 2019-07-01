import { Inject, Singleton } from 'typescript-ioc'
import { CrawlerController } from './CrawlerController'

@Singleton
export class CrawlerRouter {
  @Inject
  private crawlerController: CrawlerController

  routes (router) {
    router.get('/crawler/zhihu', this.crawlerController.crawlZhihu.bind(this.crawlerController))
  }
}
