import Redis from 'ioredis'
import * as config from 'config'
import { Singleton } from 'typescript-ioc'

@Singleton
export class RedisUtil {
  redis: Redis

  constructor () {
    this.redis = new Redis(config.get('redis'))
  }
}
