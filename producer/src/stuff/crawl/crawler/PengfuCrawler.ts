import { AbstractCrawler } from "./AbstractCrawler";
import { IFetchReplyResult } from "./IFetchReplyResult";
import { IReplyItem } from "../../../mediator";
import { StringUtil, logger } from "../../../lib";
import { Inject } from "typescript-ioc";
import { CrawlerType } from "./CrawlerType";
import * as lodash from "lodash";

export class PengfuCrawler extends AbstractCrawler {
  private MIN_UPS = 100;

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
    const title = await page.$eval("dd h1", item => item.innerText);
    const replyHtml = await page.$eval(".content-txt", item => item.innerHTML);
    // const replyText = await page.$eval(".j-r-list-c", item => item.innerText);
    const author = await page.$eval(
      ".user_name_list a",
      item => item.innerText
    );
    let upStr = await page.$eval(".ding", item => item.innerText);
    const reply = this.generateTextWithHtml(replyHtml);
    const up = this.parseUp(upStr.trim());
    logger.info(reply, author, up);
    let items = [];
    if (up >= this.MIN_UPS) {
      const item: IReplyItem = {
        platform: Symbol.keyFor(CrawlerType.PENGFU).toUpperCase(),
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
    return [
      "https://www.pengfu.com/",
      "https://www.pengfu.com/qutu_1.html",
      "https://www.pengfu.com/xiaohua_1.html",
      "https://www.pengfu.com/yuan_1.html"
    ];
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
      link.indexOf("https://www.pengfu.com/content_") >= 0 &&
      link.substr(link.length - 4) == "html" &&
      !link.includes("#")
    );
  }
}
