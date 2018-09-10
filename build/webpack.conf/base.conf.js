'use strict'

process.env.BABEL_ENV = 'app'

const fs = require('fs-extra');
const path = require('path');
const { dependencies } = require('../../package.json');
const webpack = require('webpack');

const BabiliWebpackPlugin = require('babili-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const utils = require('../utils');

const isProduction = process.env.NODE_ENV === 'production';

let mainConfig = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    dashboard: path.join(__dirname, '../../src/index.js')
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        use: 'babel-loader',
        exclude: /node_modules\/(?!element-ui\/packages)/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: isProduction,
            postcss: {
              useConfigFile: true,
            },
            // loaders: {
            //   scss: 'vue-style-loader!css-loader!sass-loader'
            // }
          }
        },
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'imgs/[name]--[folder].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name]--[folder].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            useRelativePath: false,
            outputPath: 'fonts/',
            publicPath: utils.assetsPublic(''),
            name: '[name]-[hash].[ext]',
          },
        }
      },
      {
        test: /\.md$/,
        loader: 'raw-loader'
      },
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  plugins: [
    new ExtractTextPlugin('css/[name].[hash].css'),
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: "css/[name].[hash].css",
    //   chunkFilename: "[id].css"
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new StyleLintPlugin({
      files: ['./src/**/*.vue', './src/**/*.scss'],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../../index.html'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      nodeModules: false
    }),
  ],
  output: {
    filename: '[name]-[hash].js',
    filename: utils.assetsPath('js/[name].[hash].js'),
    chunkFilename: utils.assetsPath('js/[id].[hash].js'),
    libraryTarget: "window",
    path: path.join(__dirname, '../../dist')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      'vuex$': 'vuex/dist/vuex.esm.js',
      'vue-router$': 'vue-router/dist/vue-router.esm.js',
      'vue-resource$': 'vue-resource/dist/vue-resource.esm.js',
      '@': path.resolve(__dirname, '../../src'),
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  target: 'web'
}

module.exports = mainConfig
