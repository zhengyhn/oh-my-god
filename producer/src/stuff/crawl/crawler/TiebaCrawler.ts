import { AbstractCrawler } from "./AbstractCrawler";
import { IFetchReplyResult } from "./IFetchReplyResult";
import { IReplyItem } from "../../../mediator";
import { StringUtil, logger } from "../../../lib";
import { CrawlerType } from "./CrawlerType";

export class TiebaCrawler extends AbstractCrawler {
  private MAX_LENGTH = 500;
  private MIN_RATE = 1;
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
      item => this.isQuestionLink(item) && !item.includes(link)
    );
    const title = await page.$eval(".core_title_txt", item => item.innerText);
    const replyHtml = await page.$eval(
      ".d_post_content",
      item => item.innerHTML
    );
    let replyText = await page.$eval(".d_post_content", item => item.innerText);
    const author = await page.$eval(".d_name", item => item.innerText);
    let upStr = await page.$eval(".l_reply_num > .red", item => item.innerText);
    const up = parseInt(upStr);
    const reply = this.generateTextWithHtml(replyHtml);
    // logger.info(reply);
    const wordNum =
      replyText.length + this.stringUtil.countSubstr(reply, "image[") * 10;
    logger.info(link, title, up, wordNum);
    let items = [];
    if (
      up >= this.MIN_UPS &&
      wordNum <= this.MAX_LENGTH &&
      up / wordNum >= this.MIN_RATE &&
      !this.hasWrongTitle(title)
    ) {
      const item: IReplyItem = {
        platform: Symbol.keyFor(CrawlerType.TIEBA).toUpperCase(),
        url: link,
        title,
        reply,
        author,
        up
      };
      items = [item];
    }
    return { newLinks, items };
  }

  private hasWrongTitle(title) {
    const keywords = ["吧务", "盖楼"];
    for (const keyword of keywords) {
      if (title.includes(keyword)) {
        return true;
      }
    }
    return false;
  }
  /**
   * @override
   */
  getStartPointLinks(): string[] {
    return ["https://tieba.baidu.com/index.html"];
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
    links = [...links];
    links = links.filter(item => this.isTargetLink(item));

    return links;
  }
  protected generateTextWithHtml(html: string): string {
    let set = new Set();
    let result = "";
    let j = 0;
    for (let i = 0; i < html.length; ++i) {
      if (html.substring(i, i + 5) === "<img ") {
        const start = html.indexOf("src=", i + 5);
        const end = html.indexOf('"', start + 5);
        const url = html.substring(start + 5, end);
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
        i = html.indexOf("<img ", i + 1) - 1;
      }
      if (i < 0) {
        break;
      }
    }
    result += this.stringUtil.htmlToText(html.substring(j));
    return result;
  }
  private isTiebaLink(link: string): boolean {
    return link.indexOf("tieba.baidu.com") >= 0;
  }

  private isQuestionLink(link: string): boolean {
    return (
      this.isTiebaLink(link) &&
      (link.indexOf("f?kw=") >= 0 ||
        link.indexOf("hottopic/browse/hottopic") >= 0)
    );
  }

  private isTargetLink(link: string): boolean {
    return this.isTiebaLink(link) && link.indexOf("/p/") >= 0;
  }
}
