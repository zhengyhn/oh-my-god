import { AbstractCrawler } from "./AbstractCrawler";
import { IFetchReplyResult } from "./IFetchReplyResult";
import { IReplyItem } from "../../../mediator/";
import { StringUtil, logger } from "../../../lib";
import { Inject } from "typescript-ioc";
import { CrawlerType } from "./CrawlerType";

export class NeteaseCommentCrawler extends AbstractCrawler {
  @Inject
  private stringUtil: StringUtil;
  private MIN_UPS = 10000;
  /**
   * @override
   */
  getStartPointLinks(): string[] {
    return ["http://tie.163.com/plaza.html#/splendid"];
  }

  /**
   * @override
   */
  async getReplyLinks(link: string): Promise<string[]> {
    const page = await this.puppeteer.browser.newPage();
    await page.goto(link);
    let links = await page.$$eval("a", anchors =>
      anchors.map(link => link.href)
    );
    links = links.filter(item => this.isNewsUrl(item));
    const replyLinks = links.map(link => {
      const tail = link.substr(link.lastIndexOf("/") + 1);
      return `https://comment.tie.163.com/${tail}`;
    });
    await page.close();
    return replyLinks;
  }

  /**
   * @override
   */
  async fetchContent(link: string): Promise<IFetchReplyResult> {
    const page = await this.puppeteer.browser.newPage();
    await page.goto(link);
    let newLinks = await page.$$eval("a", anchors =>
      anchors.map(item => item.href)
    );
    newLinks = newLinks.filter(link => this.isNewsUrl(link));
    const title = await page.$eval("h1", item => item.innerText);
    logger.info(title);
    let comments = await page.$$eval(".tie-hot .rgt-col", nodes =>
      nodes.map(node => {
        const comment = node.querySelector(".tie-cnt");
        const author = node.querySelector(".author-info");
        const up = node.querySelector(".support");

        return {
          reply: comment.innerHTML,
          author: author.childNodes[0].innerHTML,
          up: up.innerHTML
        };
      })
    );
    let items: IReplyItem[] = comments.map(item => {
      return {
        platform: Symbol.keyFor(CrawlerType.NETEASE_COMMENT).toUpperCase(),
        title: this.stringUtil.htmlToText(title),
        url: link,
        reply: this.stringUtil.htmlToText(item.reply),
        author: this.stringUtil.htmlToText(item.author),
        up: this.parseUps(item.up)
      };
    });
    items = items.filter(item => item.up >= this.MIN_UPS);

    await page.close();
    return { newLinks, items };
  }

  private isNewsUrl(link: string): boolean {
    return new RegExp(/[EJ|EL]\w+\.html$/g).test(link);
  }

  private parseUps(up: string): number {
    let upStr = this.stringUtil.htmlToText(up);
    upStr = upStr.substring(upStr.indexOf("[") + 1, upStr.lastIndexOf("]"));
    let ret = 0;
    if (this.stringUtil.isAllNumber(upStr)) {
      ret = parseInt(upStr, 10);
    }
    return ret;
  }
}
