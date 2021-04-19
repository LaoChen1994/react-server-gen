const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PackagePlugin = require('./packagePlugin.js')
const { getPageEntry } = require('./utils')

module.exports = {
  entry: getPageEntry(),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../local'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../pages')]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
            },
          },
        ],
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../pages')]
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../pages')]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new PackagePlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    // 分割代码块
    splitChunks: {
        chunks: 'all',
        /**
         * initial 入口 chunk，对于异步导入的文件不处理
            async 异步 chunk，只对异步导入的文件处理
            all 全部 chunk
         */

        // 缓存分组
        cacheGroups: {
            // 第三方模块
            vendor: {
                name: 'vendor_js', // chunk 名称
                priority: 1, // 权限更高，优先抽离，重要！！！
                test: /node_modules/, // 一般第三方模块都是从node_modules引进来如lodash
                minSize: 0,  // 大小限制
                minChunks: 1  // 最少复用过几次
            },

            // 公共的模块
            common: {
                name: 'common_js', // chunk 名称
                priority: 0, // 优先级
                minSize: 0,  // 公共模块的大小限制
                minChunks: 2  // 公共模块最少复用过几次
            }
        }
    }
  }
};
