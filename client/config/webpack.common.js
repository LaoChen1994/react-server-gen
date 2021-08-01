const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getPageEntry } = require('./utils');
const VersionGenPlugin = require('./VersionPlugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
  const BASE_DIR = path.resolve(__dirname, '../pages')

module.exports = (env) => {
  const isProduction = env.NODE_ENV === 'production'

  return {
    entry: getPageEntry(),
    output: {
      filename: isProduction ? '[name]_[hash:8].js' : '[name].js',
      path: path.resolve(__dirname, '../../local'),
      publicPath: 'http://127.0.0.1:3000/public/'
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
                cacheDirectory: true
              },
            },
          ],
          include: [path.resolve(__dirname, '../pages')],
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
                cacheDirectory: true,
              },
            },
          ],
          include: [path.resolve(__dirname, '../pages')],
        },
        {
          test: /\.s?(c|a)ss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader :  'style-loader',
            'css-modules-typescript-loader',
            'css-loader?modules',
            'sass-loader'
          ],
          include: [BASE_DIR],
        },
        {
          test: /\.(ttf|cof|png)/,
          use: 'file-loader'
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name]_[hash].css' : '[name].css',
        linkType: 'text/css'
      }),
      new MonacoWebpackPlugin({
        languages: ['javascript', 'typescript', 'json'],
        features:["coreCommands","find"]
      }),
      new VersionGenPlugin({
        jsPublicPath: 'http://127.0.0.1:3000/public/',
        cssPublicPath: 'http://127.0.0.1:3000/public/',
        localPath: path.resolve(__dirname, '../../local'),
        isProduction,
        mode: 'merge',
        jsVersionPath: path.resolve(__dirname, '../../config/version_js.json'),
        cssVersionPath: path.resolve(__dirname, '../../config/version_css.json')
      }),
      new DllReferencePlugin({
        context: __dirname,
        manifest: require(path.resolve(__dirname, '../../local/base_manifest.json'))
      })
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
      // 分割代码块
      splitChunks: {
        chunks: 'all',
        // 缓存分组
        cacheGroups: {
          // 第三方模块
          vendor: {
            name: 'vendor', // chunk 名称
            priority: 1, // 权限更高，优先抽离，重要！！！
            test: /node_modules/, // 一般第三方模块都是从node_modules引进来如lodash
            minSize: 0, // 大小限制
            minChunks: 1, // 最少复用过几次
          },
          // 公共的模块
          common: {
            name: 'common', // chunk 名称
            priority: 0, // 优先级
            minSize: 0, // 公共模块的大小限制
            minChunks: 2, // 公共模块最少复用过几次
          },
        },
      },
    },
  };
};
