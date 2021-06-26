import { DefaultContext } from 'koa'

interface ISetStateFunc {
  (value: Record<string, any>): void
  (name: string, value: any): void
}

export interface IMyApplicationCtx {
  config: Record<string, any>
  innerState: Record<string, any>
  setState: ISetStateFunc
  clearState: () => void
  render: (filePath: string, state: Record<string, any>) => void
  setHeader: (opts: Record<string, any>) => void
}