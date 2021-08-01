import Koa from 'koa';
// @ts-ignore
import koaViews from 'koa-nunjucks-2';
import path from 'path';
import GetConfig from './middlewares/config';
import myLog from './middlewares/log';
import myView from './middlewares/view';
import myState from './middlewares/state';
import myLoad from './middlewares/load';
import myHeader from './middlewares/header';
import myStatic from './middlewares/static';

import { router } from './init/route';

const app = new Koa();

app.use(GetConfig);
app.use(myLog);
app.use(myState);
app.use(myLoad);
app.use(myHeader);
app.use(
  koaViews({
    ext: 'njk',
    path: path.resolve(__dirname, './views'),
    nunjucksConfig: {
      trimBlocks: true,
    },
  })
);

app.use(myView);

app.use(myStatic);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server is on 3000');
});
