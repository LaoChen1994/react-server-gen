import Application from "koa";

const logMiddileware: Application.Middleware = (ctx, next) => {
  console.log(`request path ->`, ctx.url)
  return next()  
}

export default logMiddileware