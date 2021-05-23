import { IMyApplicationCtx } from 'interface';
import Application, { DefaultState } from 'koa';

const headerMiddleware: Application.Middleware<
  DefaultState,
  IMyApplicationCtx
> = async (ctx, next) => {
  ctx.setHeader = (opts: Record<string, string>) => {
    Object.keys(opts).map((key) => {
      ctx.set(key, opts[key]);
    });
  };
  await next();
};

export default headerMiddleware;
