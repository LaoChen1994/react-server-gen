import Koa from 'koa';
// @ts-ignore
import koaViews from 'koa-nunjucks-2';
import GetConfig from './init/config'
import path from 'path';
import fs from 'fs';
import VersionLoader from './init/version';
import { router } from './init/route';
import { mimes } from './constant'

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
app.use(GetConfig)

app.use(async (ctx, next) => {
  const urlPath = ctx.path;
  const regx = /\/public\/(\w+)\/(.*)/;
  const { publicPath } = ctx.config

  if (regx.test(urlPath)) {
    const [, , filename] = urlPath.match(regx)!;

    ctx.body = fs.createReadStream(
      path.resolve(__dirname, `../local/${filename}`)
    );
  }

  if (publicPath && urlPath.indexOf(publicPath) !== -1) {
    const extRegx =  /\.(\w+)(\..+)?/i
    const ext = urlPath.match(extRegx)![1]
    ctx.set('Content-Type', mimes[ext as keyof typeof mimes])
    ctx.body = fs.createReadStream(urlPath)
  }

  await next();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server is on 3000');
});
