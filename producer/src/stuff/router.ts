import { Inject, Singleton } from 'typescript-ioc'
import { StuffController } from './CrawlerController'

@Singleton
export class StuffRouter {
  @Inject
  private stuffController: StuffController

  routes (router) {
    router.post('/stuff/crawl/:platform', this.stuffController.crawl.bind(this.stuffController))
  }
}
