import { AbstractCrawler } from './AbstractCrawler'
import { IFetchReplyResult, IReplyItem } from './IFetchReplyResult'

export class ZhihuCrawler extends AbstractCrawler {
  /**
   * @override
   */
  async fetchContent (link: string): Promise<IFetchReplyResult> {
    const page = await this.puppeteer.browser.newPage()
    await page.goto(link)
    const title = await page.$eval('.QuestionHeader-title', item => item.innerText)
    const replyHtml = await page.$eval('.RichContent > .RichContent-inner', item => item.innerHTML)
    let replyText = await page.$eval('.RichContent > .RichContent-inner', item => item.innerText)
    if (replyText.length > 500) {
      return { newLinks: [], items: [] }
    }
    const author = await page.$eval('.AuthorInfo-name', item => item.innerText)
    const upStr = await page.$eval('.VoteButton', item => item.innerText)
    const reply = this.generateTextWithHtml(replyText, replyHtml)
    const up = parseInt(upStr.substr(3), 10)

    const item: IReplyItem = {
      url: link,
      title,
      reply,
      author,
      up
    }
    return { newLinks: [], items: [item] }
  }

  /**
   * @override
   */
  async getStartPointLinks (): Promise<string[]> {
    const page = await this.puppeteer.browser.newPage()
    await page.goto('https://www.zhihu.com/explore')
    let links = await page.$$eval('a.question_link', anchors => anchors.map(link => link.href))
    links = links.filter(item => item.indexOf('/question') >= 0 && item.indexOf('/answer') >= 0)

    return links
  }

  private generateTextWithHtml (text, html): string {
    let set = new Set()
    let j = 0
    let i = html.indexOf(text.substr(0, 3))
    for (; i < html.length; ++i) {
      if (html.substr(i, 10) === '<img src="') {
        const end = html.indexOf('"', i + 10)
        const url = html.substring(i + 10, end)
        const fileName = url.substr(url.lastIndexOf('/'))
        if (!set.has(fileName)) {
          text = text.substr(0, j + 3) + 'image[' + url + ']' + text.substr(j + 3)
          set.add(fileName)
        }
        i = end
      } else {
        const newPos = text.indexOf(html.substr(i, 3), j)
        j = newPos >= 0 ? newPos : j
      }
    }
    return text
  }
}
