import { Compiler } from 'webpack'
interface IOptions{
  jsPublicPath?: string
  cssPublicPath?: string
  localPath?: string
  publicPath?: string
}

declare class VersionPlugin {
  constructor(options?: IOptions);
  apply(compiler: Compiler): void;
}