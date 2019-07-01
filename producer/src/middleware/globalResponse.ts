import { logger, AppError } from '../lib'

const globalResponse = function () {
  return async (ctx, next) => {
    try {
      await next()
      ctx.body = {
        code: 0,
        data: ctx.body
      }
    } catch (err) {
      ctx.status = 200
      const defaultMsg = '系统内部错误'
      if (err instanceof AppError) {
        ctx.body = {
          code: err.code,
          msg: err.msg
        }
      } else {
        logger.error(err)
        ctx.body = {
          code: 1,
          msg: defaultMsg
        }
      }
    }
  }
}
export { globalResponse }
