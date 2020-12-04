import { Singleton, Inject } from "typescript-ioc";
import { ZhihuCrawler } from "./ZhihuCrawler";
import { TiebaCrawler } from "./TiebaCrawler";
import { NeteaseCommentCrawler } from "./NeteaseCommentCrawler";
import { AbstractCrawler } from "./AbstractCrawler";
import { CrawlerType } from "./CrawlerType";
import { AppError } from "../../../lib";
import { BudiejieCrawler } from "./BudejieCrawler";
import { PengfuCrawler } from "./PengfuCrawler";

@Singleton
export class CrawlerFactory {
  @Inject
  private zhihuCrawler: ZhihuCrawler;
  @Inject
  private tiebaCrawler: TiebaCrawler;
  @Inject
  private neteaseCommentCrawler: NeteaseCommentCrawler;
  @Inject
  private budiejieCrawler: BudiejieCrawler;
  @Inject
  private pengfuCrawler: PengfuCrawler;

  getCrawler(type: symbol): AbstractCrawler {
    switch (type) {
      case CrawlerType.ZHIHU:
        return this.zhihuCrawler;
      case CrawlerType.TIEBA:
        return this.tiebaCrawler;
      case CrawlerType.NETEASE_COMMENT:
        return this.neteaseCommentCrawler;
      case CrawlerType.BUDEJIE:
        return this.budiejieCrawler;
      case CrawlerType.PENGFU:
        return this.pengfuCrawler;
      default:
        throw new AppError(`No such crawler: ${type.toString()}`);
    }
  }
}
