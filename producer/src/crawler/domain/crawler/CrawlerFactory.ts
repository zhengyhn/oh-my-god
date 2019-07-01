import { Singleton, Inject } from 'typescript-ioc'
import { ZhihuCrawler } from './ZhihuCrawler'
import { AbstractCrawler } from './AbstractCrawler'
import { CrawlerType } from './CrawlerType'
import { AppError } from '../../../lib'

@Singleton
export class CrawlerFactory {
  @Inject
  private zhihuCrawler: ZhihuCrawler

  getCrawler (type: symbol): AbstractCrawler {
    switch (type) {
      case CrawlerType.ZHIHU:
        return this.zhihuCrawler
      default:
        throw new AppError(`No such crawler: ${type.toString()}`)
    }
  }
}
