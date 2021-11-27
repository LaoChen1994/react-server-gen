const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const { VersionPlugin } = require('webpack-version-generation-plugin');

module.exports = (env) => {
  const isProduction = env.NODE_ENV === 'production';
  return {
    entry: {
      base: path.resolve(__dirname, '../common/base.js'),
    },
    mode: 'production',
    output: {
      path: path.resolve(__dirname, '../../local'),
      filename: '[name].js',
      library: '_dll_[name]',
    },
    plugins: [
      new DllPlugin({
        name: 'base',
        path: path.join(__dirname, '../../local/[name]_manifest.json'),
      }),
      new VersionPlugin({
        jsPublicPath: 'http://127.0.0.1:3000/public/',
        cssPublicPath: 'http://127.0.0.1:3000/public/',
        localPath: path.resolve(__dirname, '../../local'),
        isProduction,
        jsVersionPath: path.resolve(__dirname, '../../config/version_js.json'),
        cssVersionPath: path.resolve(__dirname, '../../config/version_css.json')
      }),
    ],
  };
};
