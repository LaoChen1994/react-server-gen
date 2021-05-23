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

  if (regx.test(urlPath)) {
    const [, filename, ext] = urlPath.match(regx)!;

    if (filename && ext) {
      staticPath = path.resolve(__dirname, `../../local/${filename}.${ext}`);
      extension = ext;
    }
  }

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
