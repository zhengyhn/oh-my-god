import { AbstractCrawler } from "./AbstractCrawler";
import { IFetchReplyResult } from "./IFetchReplyResult";
import { IReplyItem } from "../../../mediator/";
import { StringUtil, logger } from "../../../lib";
import { Inject } from "typescript-ioc";
import { CrawlerType } from "./CrawlerType";

export class ZhihuCrawler extends AbstractCrawler {
  private MAX_LENGTH = 200;
  private MIN_RATE = 3;
  private MIN_UPS = 1000;

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
      item =>
        (this.isQuestionLink(item) || this.isCollectionLink(item)) &&
        !item.includes(link)
    );
    // logger.info(newLinks)
    const title = await page.$eval(
      ".QuestionHeader-title",
      item => item.innerText
    );
    const replyHtml = await page.$eval(
      ".RichContent > .RichContent-inner",
      item => item.innerHTML
    );
    let replyText = await page.$eval(
      ".RichContent > .RichContent-inner",
      item => item.innerText
    );
    const author = await page.$eval(".AuthorInfo-name", item => item.innerText);
    let upStr = await page.$eval(".VoteButton", item => item.innerText);
    const up = this.parseUp(upStr);
    const reply = this.generateTextWithHtml(replyHtml);
    const wordNum =
      replyText.length + this.stringUtil.countSubstr(reply, "image[") * 10;
    logger.info(link, title, upStr, upStr.substr(3), up, wordNum);
    let items = [];
    if (
      up >= this.MIN_UPS &&
      wordNum <= this.MAX_LENGTH &&
      up / wordNum >= this.MIN_RATE &&
      !title.includes("视频")
    ) {
      const item: IReplyItem = {
        platform: Symbol.keyFor(CrawlerType.ZHIHU).toUpperCase(),
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
      "https://www.zhihu.com/collection/30386924",
      "https://www.zhihu.com/collection/42655683",
      "https://www.zhihu.com/collection/175577689",
      "https://www.zhihu.com/collection/36809906"
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
    let metaLinks = await page.$$eval("meta", anchors =>
      anchors.map(link => link.content)
    );
    links = [...links, ...metaLinks];
    links = links.filter(item => this.isTargetLink(item));

    // await page.close();
    return links;
  }

  private parseUp(upStr: string): number {
    upStr = upStr.substr(upStr.indexOf("同 ") + 2);
    let up = 0;
    if (upStr[upStr.length - 1] === "K") {
      upStr = upStr.substr(0, upStr.length - 1);
      up = parseFloat(upStr) * 1000;
    } else {
      if (this.stringUtil.isAllNumber(upStr)) {
        up = parseInt(upStr, 10);
      }
    }
    return up;
  }

  private isQuestionLink(link: string): boolean {
    return link.indexOf("zhihu.com") >= 0 && link.indexOf("/question") >= 0;
  }

  private isCollectionLink(link: string): boolean {
    return link.indexOf("zhihu.com") >= 0 && link.indexOf("/collection/") >= 0;
  }
  private isTargetLink(link: string): boolean {
    return this.isQuestionLink(link) && link.indexOf("/answer") >= 0;
  }
}
