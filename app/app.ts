import Koa from 'koa';
// @ts-ignore
import koaViews from 'koa-nunjucks-2';
import path from 'path';
import fs from 'fs';
import LoadUtil from './init/load';
import { router } from './init/route';

const app = new Koa();

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

  ctx.render = async (templatePath: string, state?: Record<string, any>) => {
    const renderState = ctx.innerState;
    ctx.innerState = {};

    render(templatePath, state || renderState);
  };

  ctx.setState({ loadJs: LoadUtil.loadJs });

  await next();
});

app.use(async (ctx, next) => {
  const urlPath = ctx.path;
  const regx = /\/public\/(\w+)\/(.*)/;

  if (regx.test(urlPath)) {
    const [, , filename] = urlPath.match(regx)!;
    ctx.body = fs.createReadStream(
      path.resolve(__dirname, `../local/${filename}`)
    );
  }

  await next();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server is on 3000');
});
