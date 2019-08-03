import * as Router from 'koa-router'
import { globalResponse } from './middleware'
import { StuffRouter } from './stuff'

const router = new Router()

router.use(globalResponse())
new StuffRouter().routes(router)

export default router
