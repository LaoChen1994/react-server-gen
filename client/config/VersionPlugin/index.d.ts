import { Compiler } from 'webpack'
export enum GEN_MODE {
  MERGE =  'merge',
  OVERITE =  'overwrite',
};
interface IOptions{
  jsPublicPath: string
  cssPublicPath: string
  localPath?: string
  publicPath?: string
  jsVersionPath: string
  cssVersionPath: string
  mode: GEN_MODE
}

declare class VersionPlugin {
  constructor(options?: IOptions);
  apply(compiler: Compiler): void;
}