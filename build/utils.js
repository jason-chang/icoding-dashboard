const config = require('./config')

const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

exports.assetsPath = function (_path) {
  let assetsSubDirectory = '';

  return path.posix.join(assetsSubDirectory, _path)
}

exports.assetsPublic = function (_path) {
  let publicDomain = `//127.0.0.1:${config.devSever.port}`;

  if (process.env.NODE_ENV === 'production') {
    publicDomain = '//s2.icoding.so';
  }

  return publicDomain + '/' + _path;
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      // minimize: options.minimize,
      sourceMap: options.sourceMap
    }
  };

  const postCssLoader = {
    loader: 'postcss-loader'
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    loaders.push(postCssLoader);

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    scss: generateLoaders('sass'),
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}
