import { Singleton } from "typescript-ioc";
import * as puppeteer from "puppeteer-core";
import { logger } from "./";

@Singleton
export class Puppeteer {
  browser;

  async launch() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        executablePath:
          "/usr/local/Caskroom/google-chrome/latest/Google Chrome.app/Contents/MacOS/Google Chrome",
        headless: true,
        devtools: false
      });
    }
  }

  async close() {
    if (this.browser) {
      this.browser.close();
      this.browser = null;
      logger.info("Puppeteer closed");
    }
  }
}
