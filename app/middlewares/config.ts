import Application from "koa";
// @ts-ignore
import config from '../../config/config.js'
import { get } from 'lodash'

const initConfig: Application.Middleware = (ctx, next) => {
  ctx.config = config
  ctx.getConfig = (key: string) => get(config, key)
  return next()  
}

export default initConfig