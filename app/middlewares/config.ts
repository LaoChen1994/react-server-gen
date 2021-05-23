import Application from "koa";
// @ts-ignore
import config from '../../config/config.js'

const initConfig: Application.Middleware = (ctx, next) => {
  ctx.config = config
  return next()  
}

export default initConfig