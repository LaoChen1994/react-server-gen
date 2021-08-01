import Application, { DefaultState } from 'koa';
import { IMyApplicationCtx } from '../interface';
import VersionLoader from '../init/version';

const viewLoaderMiddleware: Application.Middleware<
  DefaultState,
  IMyApplicationCtx
> = async (ctx, next) => {
  let loader = ctx.versionLoader;
  const { config } = ctx;

  if (!ctx.versionLoader) {
    const { versionJs, versionCss } = config;
    loader = new VersionLoader({
      jsVersionPath: versionJs,
      cssVersionPath: versionCss,
    });

    ctx.versionLoader = loader;
  }

  ctx.setState({
    loadJs: loader.loadJs.bind(loader),
    loadCss: loader.loadCss.bind(loader),
  });

  return next();
};

export default viewLoaderMiddleware;
