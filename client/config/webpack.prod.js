const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const { DefinePlugin } = require('webpack')

module.exports = merge(commonConfig, {
    mode: 'production',
    plugins: [
      new DefinePlugin({
        NODE_ENV: 'prod'
      })
    ]
})

