import * as Router from 'koa-router'
import { globalResponse } from './middleware'
import { CrawlerRouter } from './crawler'

const router = new Router()

router.use(globalResponse())
new CrawlerRouter().routes(router)

export default router
