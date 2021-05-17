const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = (env) =>
  merge(commonConfig(env), {
    mode: 'development',
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: 500,
      aggregateTimeout: 500,
    },
    cache: true,
    devtool: 'source-map',
  });
