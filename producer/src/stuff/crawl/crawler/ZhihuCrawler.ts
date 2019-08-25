import { AbstractCrawler } from "./AbstractCrawler";
import { IFetchReplyResult } from "./IFetchReplyResult";
import { IReplyItem } from "../../../mediator/";
import { StringUtil, logger } from "../../../lib";
import { Inject } from "typescript-ioc";
import { CrawlerType } from "./CrawlerType";

export class ZhihuCrawler extends AbstractCrawler {
  @Inject
  private stringUtil: StringUtil;
  private MAX_LENGTH = 300;
  private MIN_RATE = 2;
  private MIN_UPS = 500;

  /**
   * @override
   */
  async fetchContent(link: string): Promise<IFetchReplyResult> {
    const page = await this.puppeteer.browser.newPage();
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
    let items = [];
    if (
      up >= this.MIN_UPS &&
      replyText.length <= this.MAX_LENGTH &&
      up / replyText.length >= this.MIN_RATE
    ) {
      const reply = this.generateTextWithHtml(replyHtml);
      logger.info(link, title, upStr, upStr.substr(3), up, replyText.length);

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
    await page.close();
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
    const page = await this.puppeteer.browser.newPage();
    await page.goto(link);
    let links = await page.$$eval("a", anchors =>
      anchors.map(link => link.href)
    );
    let metaLinks = await page.$$eval("meta", anchors =>
      anchors.map(link => link.content)
    );
    links = [...links, ...metaLinks];
    links = links.filter(item => this.isTargetLink(item));

    await page.close();
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

  private generateTextWithHtml(html): string {
    let set = new Set();
    let result = "";
    let j = 0;
    for (let i = 0; i < html.length; ++i) {
      if (html.substring(i, i + 10) === '<img src="') {
        const end = html.indexOf('"', i + 10);
        const url = html.substring(i + 10, end);
        const fileName = url.substring(url.lastIndexOf("/") + 1);
        if (!set.has(fileName)) {
          result +=
            this.stringUtil.htmlToText(html.substring(j, i)) +
            "image[" +
            url +
            "]";
          set.add(fileName);
        }
        i = html.indexOf(">", end);
        j = i + 1;
      } else {
        i = html.indexOf('<img src="', i + 1) - 1;
      }
      if (i < 0) {
        break;
      }
    }
    result += this.stringUtil.htmlToText(html.substring(j));
    return result;
  }
}
