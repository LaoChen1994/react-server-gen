import Application from 'koa';

const logMiddileware: Application.Middleware = (ctx, next) => {
  const requestStr = `request path -> ${ctx.url}`;
  console.log(requestStr);
  return next();
};

export default logMiddileware;
