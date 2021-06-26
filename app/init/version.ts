import path from 'path';
import fs from 'fs'

interface IVersionLoaderProps {
  jsVersionPath?: string;
  cssVersionPath?: string;
}
export default class VersionLoader {
  public jsPath: string;
  public cssPath: string;
  public jsVersionMap: Record<string, string>
  public cssVersionMap: Record<string, string>

  constructor(params?: IVersionLoaderProps) {
    const {
      jsVersionPath = path.resolve(__dirname, '../../config/version_js.json'),
      cssVersionPath = path.resolve(__dirname, '../../config/version_css.json'),
    } = params || {};
    this.jsPath = jsVersionPath;
    this.cssPath = cssVersionPath;
    this.jsVersionMap = {}
    this.cssVersionMap = {}

    this.loadVersion()
  }

  transformMap(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath).toString())
  }

  loadVersion() {
    this.jsVersionMap = this.transformMap(this.jsPath)
    this.cssVersionMap = this.transformMap(this.cssPath)
  }

  loadJs(chunkName: string) {
    const linkPath = this.jsVersionMap[chunkName]

    if (!linkPath) return ''
    return `<script src="${linkPath}" type="text/javascript"></script>`
  }

  loadCss(chunkName: string) {
    const linkPath = this.cssVersionMap[chunkName]
    if (!linkPath) return ''
    return `<link rel="stylesheet" type="text/css" href="${linkPath}" />
    `
  }
}