import * as Koa from 'koa'
import * as koaBodyparser from 'koa-bodyparser'
import * as koaJson from 'koa-json'
import router from './router'
import { logger } from './lib'

const app = new Koa()
app.use(koaBodyparser())
app.use(koaJson())
app.use(router.routes())
app.use(router.allowedMethods())

const port = 9280
logger.info('Server started, listening at 9280')
app.listen(port)
