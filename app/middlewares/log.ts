import Application from "koa";

const initConfig: Application.Middleware = (ctx, next) => {
  console.log(`request path ->`, ctx.url)
  return next()  
}

export default initConfig