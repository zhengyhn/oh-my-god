import { AbstractCrawler } from "./AbstractCrawler";
import { IFetchReplyResult } from "./IFetchReplyResult";
import { IReplyItem } from "../../../mediator";
import { StringUtil, logger } from "../../../lib";
import { Inject } from "typescript-ioc";
import { CrawlerType } from "./CrawlerType";
import * as lodash from "lodash";

export class BudiejieCrawler extends AbstractCrawler {
  private MIN_UPS = 400;

  /**
   * @override
   */
  async fetchContent(link: string): Promise<IFetchReplyResult> {
    let page = await this.getPageInstance();
    await page.goto(link);
    let newLinks = await page.$$eval("a", anchors =>
      anchors.map(item => item.href)
    );
    newLinks = newLinks.filter(
      item => this.isTargetLink(item) && !item.includes(link)
    );
    const title = "";
    const replyHtml = await page.$eval(".j-r-list-c", item => item.innerHTML);
    // const replyText = await page.$eval(".j-r-list-c", item => item.innerText);
    const author = await page.$eval(
      ".u-txt > .u-user-name",
      item => item.innerText
    );
    let upStr = await page.$eval(".j-r-list-tool-l-up", item => item.innerText);
    const reply = this.generateTextWithHtml(replyHtml);
    const up = this.parseUp(upStr.trim());
    logger.info(reply, author, up);
    let items = [];
    if (up >= this.MIN_UPS) {
      const item: IReplyItem = {
        platform: Symbol.keyFor(CrawlerType.BUDEJIE).toUpperCase(),
        url: link,
        title,
        reply,
        author,
        up
      };
      items = [item];
    }
    // await page.close();
    return { newLinks, items };
  }

  /**
   * @override
   */
  getStartPointLinks(): string[] {
    return ["http://www.budejie.com/pic/", "http://www.budejie.com/old/"];
  }

  /**
   * @override
   */
  async getReplyLinks(link: string): Promise<string[]> {
    let page = await this.getPageInstance();
    await page.goto(link);
    let links = await page.$$eval("a", anchors =>
      anchors.map(link => link.href)
    );
    links = links.filter(item => this.isTargetLink(item));

    // await page.close();
    return links;
  }

  private parseUp(upStr: string): number {
    let up = 0;
    console.log(upStr);
    if (this.stringUtil.isAllNumber(upStr)) {
      up = parseInt(upStr, 10);
    }
    return up;
  }

  private isTargetLink(link: string): boolean {
    return (
      link.indexOf("http://www.budejie.com/detail-") >= 0 &&
      !link.includes("comment") &&
      !link.includes("#")
    );
  }
}
