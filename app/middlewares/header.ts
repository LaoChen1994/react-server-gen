import Application, { DefaultState } from 'koa';
import { IMyApplicationCtx } from '../interface';

const headerMiddleware: Application.Middleware<
  DefaultState,
  IMyApplicationCtx
> = async (ctx, next) => {
  ctx.setHeader = (opts: Record<string, string>) => {
    Object.keys(opts).forEach((key) => {
      ctx.set(key, opts[key]);
    });
  };
  await next();
};

export default headerMiddleware;
