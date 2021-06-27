import { IMyApplicationCtx } from 'interface';
import Application, { DefaultState } from 'koa';
import path from 'path';
import fs from 'fs'
import { mimes } from '../constant'

const headerMiddleware: Application.Middleware<
  DefaultState,
  IMyApplicationCtx
> = async (ctx, next) => {
  const urlPath = ctx.path;
  const regx = /\/public\/(\w+)\.(\w+)/i;
  const { publicPath } = ctx.config;

  let staticPath = '';
  let extension = '';

  // 这部分是build的场景用的
  if (regx.test(urlPath)) {
    const [, filename, ext] = urlPath.match(regx)!;

    if (filename && ext) {
      staticPath = `${publicPath}/${filename}.${ext}`;
      extension = ext;
    }
  }

  // 这部分是本地加载的时候用的
  if (publicPath && urlPath.indexOf(publicPath) !== -1) {
    const extRegx = /\.(\w+)(\..+)?/i;
    extension = urlPath.match(extRegx)![1];
    staticPath = urlPath;
  }

  if (extension && staticPath) {
    ctx.set('Content-Type', mimes[extension as keyof typeof mimes]);
    ctx.body = fs.createReadStream(staticPath);
  }

  await next();
};

export default headerMiddleware;
