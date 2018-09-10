const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.conf');
const utils = require('../utils');

module.exports = merge(baseConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: false
    }),
  },
  output: {
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
  ],
});
