import { AbstractApi, logger } from '../lib/'
import { Singleton } from 'typescript-ioc'
import * as config from 'config'
import { IReplyItem } from './IReplyItem'

@Singleton
export class MediatorApi extends AbstractApi {
  /**
   * @override
   */
  getApiUrl (): string {
    return config.get('mediator.url')
  }

  async addReplies (replies: IReplyItem[]) {
    const url = this.getApiUrl() + '/reply/add'
    const body = {
      items: replies
    }
    const result = await super.postJSON({ url, body })
    if (result && result.code !== 0) {
      logger.warn(result)
    }
  }
}
