import { Singleton, Inject } from 'typescript-ioc'
import { ZhihuCrawler } from './ZhihuCrawler'
import { NeteaseCommentCrawler } from './NeteaseCommentCrawler'
import { AbstractCrawler } from './AbstractCrawler'
import { CrawlerType } from './CrawlerType'
import { AppError } from '../../../lib'

@Singleton
export class CrawlerFactory {
  @Inject
  private zhihuCrawler: ZhihuCrawler
  @Inject
  private neteaseCommentCrawler: NeteaseCommentCrawler

  getCrawler (type: symbol): AbstractCrawler {
    switch (type) {
      case CrawlerType.ZHIHU:
        return this.zhihuCrawler
      case CrawlerType.NETEASE_COMMENT:
        return this.neteaseCommentCrawler
      default:
        throw new AppError(`No such crawler: ${type.toString()}`)
    }
  }
}
