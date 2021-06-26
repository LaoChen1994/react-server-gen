import VersionLoader from '../init/version'
import { IMyApplicationCtx } from 'interface';
import Application, { DefaultState } from 'koa';
const loader = new VersionLoader()

const viewLoaderMiddleware: Application.Middleware<
  DefaultState,
  IMyApplicationCtx
> = async (ctx, next) => {
  ctx.setState({
    loadJs: loader.loadJs.bind(loader),
    loadCss: loader.loadCss.bind(loader),
  });

  return next();
};

export default viewLoaderMiddleware;


