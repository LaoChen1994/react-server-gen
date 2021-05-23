import Koa from 'koa';
// @ts-ignore
import koaViews from 'koa-nunjucks-2';
import GetConfig from './middlewares/config';
import myLog from './middlewares/log';

import path from 'path';
import fs from 'fs';
import VersionLoader from './init/version';
import { router } from './init/route';
import { mimes } from './constant';

const app = new Koa();
const loader = new VersionLoader();

app.use(
  koaViews({
    ext: 'njk',
    path: path.resolve(__dirname, './views'),
    nunjucksConfig: {
      trimBlocks: true,
    },
  })
);

app.use(async (ctx, next) => {
  const { render } = ctx;
  ctx.innerState = {};

  ctx.setState = function (state: Record<string, any>) {
    ctx.innerState = { ...ctx.innerState, ...state };
  };

  ctx.setHeader = (opts: Record<string, string>) => {
    Object.keys(opts).map((key) => {
      ctx.set(key, opts[key]);
    });
  };

  ctx.render = async (fielPath: string, state?: Record<string, any>) => {
    const renderState = ctx.innerState;
    ctx.innerState = {};
    const templatePath = path.join(__dirname, './views', fielPath);

    render(templatePath, state || renderState);
  };

  ctx.setState({
    loadJs: loader.loadJs.bind(loader),
    loadCss: loader.loadCss.bind(loader),
  });

  await next();
});
app.use(GetConfig);
app.use(myLog);

app.use(async (ctx, next) => {
  const urlPath = ctx.path;
  const regx = /\/public\/(\w+)\.(\w+)/i;
  const { publicPath } = ctx.config;

  let staticPath = '';
  let extension = '';

  if (regx.test(urlPath)) {
    const [, filename, ext] = urlPath.match(regx)!;

    if (filename && ext) {
      staticPath = path.resolve(__dirname, `../local/${filename}.${ext}`);
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
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server is on 3000');
});
