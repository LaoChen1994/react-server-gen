const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = (env) => {
  env.NODE_ENV = 'production'
  
  return merge(common(env), {
    mode: 'production',
    optimization: {
      usedExports: true,
      minimize: true,
      minimizer: [
        new TerserWebpackPlugin({
          parallel: true,
          terserOptions: {
            toplevel: true,
          }
        })
      ]
    }
  });
}
  
