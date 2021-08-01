import { Middleware, DefaultState } from 'koa';
import { set } from 'lodash';
import { IMyApplicationCtx } from '../interface';

const stateMiddleWare: Middleware<DefaultState, IMyApplicationCtx> = (
  ctx,
  next
) => {
  ctx.innerState = {};
  ctx.setState = (keyOrValue: Record<string, any> | string, value?: any) => {
    if (typeof keyOrValue === 'string') {
      set(ctx.innerState, keyOrValue, value);
    } else {
      ctx.innerState = { ...ctx.innerState, ...keyOrValue };
    }
  };
  ctx.clearState = () => {
    ctx.innerState = {};
  };
  return next();
};

export default stateMiddleWare;
