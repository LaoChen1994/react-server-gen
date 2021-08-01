import Application from 'koa';
// @ts-ignore
import { get } from 'lodash';
import config from '../../config/config';

const initConfig: Application.Middleware = (ctx, next) => {
  ctx.config = config;
  ctx.getConfig = (key: string) => get(config, key);
  return next();
};

export default initConfig;
