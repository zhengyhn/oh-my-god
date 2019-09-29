import { Inject } from "typescript-ioc";
import { StringUtil, RedisUtil, Puppeteer, logger } from "../../../lib";
import { IFetchReplyResult } from "./IFetchReplyResult";
import * as bluebird from "bluebird";
import * as lodash from "lodash";
import { MediatorApi } from "../../../mediator";

export abstract class AbstractCrawler {
  @Inject
  protected puppeteer: Puppeteer;
  @Inject
  private redisUtil: RedisUtil;
  @Inject
  protected stringUtil: StringUtil;
  @Inject
  private mediatorApi: MediatorApi;
  private linkRedisPrefix = "producer:stuff:crawler";
  private linkRedisTtlSeconds = 60 * 30;

  async crawl() {
    await this.puppeteer.launch();
    let questionLinks = this.getStartPointLinks();
    while (questionLinks.length > 0) {
      logger.info("question links:", questionLinks.length);
      const questionLink = questionLinks.splice(0, 1)[0];
      const questionRedisKey = `${this.linkRedisPrefix}:${questionLink}`;
      const exists = await this.redisUtil.redis.get(questionRedisKey);
      if (exists) {
        continue;
      }
      let links = [];
      try {
        logger.info(questionLink);
        links = await this.getReplyLinks(questionLink);
      } catch (err) {
        logger.error(err);
      }
      logger.info("answer links:", links.length);
      let replies = [];
      while (links.length > 0) {
        const link = links.splice(0, 1)[0];
        const answerRedisKey = `${this.linkRedisPrefix}:${link}`;
        const exists = await this.redisUtil.redis.get(answerRedisKey);
        if (exists) {
          continue;
        }
        let result: IFetchReplyResult;
        try {
          // await bluebird.delay(500);
          logger.info(link);
          result = await this.fetchContent(link);
        } catch (err) {
          logger.error(err);
          continue;
        }
        questionLinks = lodash.uniq([...questionLinks, ...result.newLinks]);
        replies = [...replies, ...result.items];
        await this.redisUtil.redis.set(
          answerRedisKey,
          true,
          "EX",
          this.linkRedisTtlSeconds
        );
      }
      logger.info("reply count:", replies.length);
      await this.mediatorApi.addReplies(replies);
      if (!this.getStartPointLinks().includes(questionLink)) {
        await this.redisUtil.redis.set(
          questionRedisKey,
          true,
          "EX",
          this.linkRedisTtlSeconds
        );
      }
      await bluebird.delay(500);
    }
    await this.puppeteer.close();
  }

  protected async getPageInstance() {
    const pages = await this.puppeteer.browser.pages();
    let page;
    if (pages.length > 0) {
      page = pages[0];
    } else {
      page = await this.puppeteer.browser.newPage();
    }
    return page;
  }
  protected generateTextWithHtml(html: string): string {
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
  abstract getStartPointLinks(): string[];
  abstract getReplyLinks(link: string): Promise<string[]>;
  abstract fetchContent(link: string): Promise<IFetchReplyResult>;
}
