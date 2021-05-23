import { Middleware, DefaultState } from 'koa'
import { IMyApplicationCtx } from '../interface'
import { set } from 'lodash'

const stateMiddleWare: Middleware<DefaultState, IMyApplicationCtx> = (ctx, next) => {
  ctx.innerState = {}
  ctx.setState = (keyOrValue: Record<string, any> | string, value?: any) => {
    if (typeof keyOrValue === 'string') {
      set(ctx.innerState, keyOrValue, value)
    } else {
      ctx.innerState = { ...ctx.innerState, ...keyOrValue }
    }

  }
  ctx.clearState = () => ctx.innerState = {}
  return next()
}


export default stateMiddleWare