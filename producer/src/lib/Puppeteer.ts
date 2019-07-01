import { Singleton } from 'typescript-ioc'
import * as puppeteer from 'puppeteer-core'

@Singleton
export class Puppeteer {
  browser

  async launch () {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        executablePath: '/usr/local/Caskroom/google-chrome/latest/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: true,
        devtools: true
      })
    }
  }
}
