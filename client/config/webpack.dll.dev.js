const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const VersionGenPlugin = require('./VersionPlugin');

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
        name: '_dll_[name]',
        path: path.join(__dirname, '../../local/[name]_manifest.json'),
      }),
      new VersionGenPlugin({
        jsPublicPath: 'http://127.0.0.1:8001/js/',
        cssPublicPath: 'http://127.0.0.1:8001/css/',
        localPath: path.resolve(__dirname, '../../local'),
        isProduction,
      }),
    ],
  };
};
