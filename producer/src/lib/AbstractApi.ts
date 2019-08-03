import * as superagent from 'superagent'
import { logger } from './logger'

export abstract class AbstractApi {
  protected async postJSON ({ url, body }) {
    try {
      const res = await superagent.post(url).send(body)
      return res.body
    } catch (err) {
      logger.warn(err)
    }
  }

  abstract getApiUrl (): string
}
