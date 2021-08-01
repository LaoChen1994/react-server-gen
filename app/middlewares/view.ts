import Application, { DefaultState } from 'koa';

import path from 'path';
import { IMyApplicationCtx } from '../interface';

const viewMiddleware: Application.Middleware<
  DefaultState,
  IMyApplicationCtx
> = async (ctx, next) => {
  const { render: _render } = ctx;

  ctx.render = async (fielPath: string, state?: Record<string, any>) => {
    const renderState = ctx.innerState;
    ctx.innerState = {};
    const templatePath = path.join(__dirname, '../views', fielPath);

    _render(templatePath, { ...renderState, ...(state || {}) });
  };

  return next();
};

export default viewMiddleware;
