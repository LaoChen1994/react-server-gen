import VersionLoader from '../init/version'
import { IMyApplicationCtx } from 'interface';
import Application, { DefaultState } from 'koa';


const viewLoaderMiddleware: Application.Middleware<
  DefaultState,
  IMyApplicationCtx
> = async (ctx, next) => {
  let loader = ctx.versionLoader
  const config = ctx.config

  if (!ctx.versionLoader) {
    const { versionJs, versionCss } = config
    loader = ctx.versionLoader = new VersionLoader({
      jsVersionPath: versionJs,
      cssVersionPath: versionCss
    })
  }

  ctx.setState({
    loadJs: loader.loadJs.bind(loader),
    loadCss: loader.loadCss.bind(loader),
  });

  return next();
};

export default viewLoaderMiddleware;


