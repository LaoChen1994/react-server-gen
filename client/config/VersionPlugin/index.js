const path = require('path');
const { URL } = require('url');
const fs = require('fs');
const chalk = require('chalk');

const STATIC_FILE_TYPE = {
  CSS: 'css',
  JS: 'js',
  STATIC_FILE: 'static',
};

const GEN_MODE = {
  MERGE: 'merge',
  OVERITE: 'overwrite',
};

class VersionPlugin {
  constructor(props = {}) {
    const {
      jsPublicPath = '',
      cssPublicPath = '',
      localPath = '',
      isProduction = false,
      publicPath = '',
      mode = GEN_MODE.OVERITE,
      jsVersionPath = '',
      cssVersionPath = ''
    } = props;

    this.jsPublicPath = jsPublicPath;
    this.cssPublicPath = cssPublicPath;
    this.localPath = localPath;
    this.isProduction = isProduction;
    this.publicPath = publicPath;
    this.mode = mode;
    this.jsVersionPath = jsVersionPath
    this.cssVersionPath = cssVersionPath
  }

  getStaticPath(fileName) {
    const isJS = fileName.match(/\.js$/);
    const isCss = fileName.match(/.css$/);
    let prefixUrl = '';

    if (!this.isProduction) {
      prefixUrl = path.join(this.localPath, fileName);
    } else {
      prefixUrl = new URL(
        fileName,
        isJS ? this.jsPublicPath : isCss ? this.cssPublicPath : this.publicPath
      );
    }

    return {
      type: isJS
        ? STATIC_FILE_TYPE.JS
        : isCss
        ? STATIC_FILE_TYPE.CSS
        : STATIC_FILE_TYPE.STATIC_FILE,
      path: prefixUrl,
    };
  }

  apply(compiler) {
    let chunkJSMap = {};
    let chunkCssMap = {};
    const that = this;
    const jsVersionPath = path.resolve(
      __dirname,
      this.jsVersionPath
    );
    const cssVersionPath = path.resolve(
      __dirname,
     this.cssVersionPath
    );

    compiler.hooks.emit.tapAsync('myPlugin', async function (compilation, cb) {
      compilation.chunks.forEach((chunk) => {
        const chunkName = chunk.name;

        chunk.files.forEach((filename) => {
          const { type, path } = that.getStaticPath(filename);
          switch (type) {
            case STATIC_FILE_TYPE.JS:
              chunkJSMap[chunkName] = path;
              break;
            case STATIC_FILE_TYPE.CSS:
              chunkCssMap[chunkName] = path;
            default:
              break;
          }
        });
      });

      if (that.mode === GEN_MODE.MERGE) {
        try {
          const prevJsMap = JSON.parse(fs.readFileSync(jsVersionPath) || '{}');
          const prevCssMap = JSON.parse(
            fs.readFileSync(cssVersionPath) || '{}'
          );

          chunkJSMap = { ...chunkJSMap, ...prevJsMap };
          chunkCssMap = { ...chunkCssMap, ...prevCssMap };
        } catch (error) {
          console.log('读取文件错误 ->', error);
        }
      }

      fs.writeFileSync(jsVersionPath, JSON.stringify(chunkJSMap));
      fs.writeFileSync(cssVersionPath, JSON.stringify(chunkCssMap));

      chalk.yellow(`js version 文件已经生成${jsVersionPath}`)
      chalk.yellow(`css version 文件已经生成${cssVersionPath}`)

      cb();
    });
  }
}

module.exports = VersionPlugin;
